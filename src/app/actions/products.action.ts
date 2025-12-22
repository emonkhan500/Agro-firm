'use server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  created: string;
}

const productDir = path.join(process.cwd(), 'public/products');
const jsonPath = path.join(productDir, 'product.json');
function ensureDir() {
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }
}

// Get
export async function getProducts(): Promise<Product[]> {
  ensureDir();
  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
    return [];
  }
  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// Create
export async function createProduct(formData: FormData) {
  ensureDir();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !description || !imageFile) return;
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const imageName = `${Date.now()}-${imageFile.name}`;
  const imagePath = path.join(productDir, imageName);

  fs.writeFileSync(imagePath, buffer);
  const products = await getProducts();
  const newProduct: Product = {
    id: Date.now(),
    title,
    description,
    image: `/products/${imageName}`,
    created: new Date().toISOString().split('T')[0],
  };

  products.push(newProduct);

  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
  revalidatePath('/dashboard/products');
}
// Delete Product

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return false;
    const imgPath = path.join(process.cwd(), 'public', product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    fs.writeFileSync(
      jsonPath,
      JSON.stringify(
        products.filter((p) => p.id !== id),
        null,
        2
      )
    );

    revalidatePath('/dashboard/products');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
// Update
export async function updateProduct(
  id: number,
  formData: FormData
): Promise<boolean> {
  try {
    ensureDir();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    let imagePath = products[index].image;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageName = `${Date.now()}-${imageFile.name}`;
      const newImagePath = path.join(productDir, imageName);

      fs.writeFileSync(newImagePath, buffer);
      const oldImagePath = path.join(process.cwd(), 'public', imagePath);
      if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      imagePath = `/products/${imageName}`;
    }

    products[index] = {
      ...products[index],
      title,
      description,
      image: imagePath,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
    revalidatePath('/dashboard/products');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
