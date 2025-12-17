"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { ProductPayload } from "@/components/dashboard/products/DashProductModal";

export interface Product {
  id: number;
  title: string;
  image: string;
  created: string;
}

const productDir = path.join(process.cwd(), "public/products");
const jsonPath = path.join(productDir, "product.json");

/* ======================
   Helper: ensure folder
====================== */
function ensureDir() {
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }
}

/* ======================
   Get Products
====================== */
export async function getProducts(): Promise<Product[]> {
  ensureDir();

  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
    return [];
  }

  const data = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(data);
}

/* ======================
   Create Product
====================== */
export async function createProduct(formData: FormData) {
  ensureDir();

  const title = formData.get("title") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !imageFile) return;

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const imageName = `${Date.now()}-${imageFile.name}`;
  const imagePath = path.join(productDir, imageName);

  fs.writeFileSync(imagePath, buffer);

  const products = await getProducts();

  const newProduct: Product = {
    id: Date.now(),
    title,
    image: `/products/${imageName}`,
    created: new Date().toISOString().split("T")[0],
  };

  products.push(newProduct);

  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));

  revalidatePath("/dashboard/products");
}

/* ======================
   Delete Product
====================== */
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    ensureDir();

    const products = await getProducts();
    const product = products.find((p) => p.id === id);

    if (!product) return false;

    // delete image
    const imgPath = path.join(process.cwd(), "public", product.image);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    const updated = products.filter((p) => p.id !== id);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2));

    revalidatePath("/dashboard/products");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
