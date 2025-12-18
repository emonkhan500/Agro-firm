"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export interface Cattle {
  id: number;
  title: string;
  image: string;
  created: string;
}

const cattleDir = path.join(process.cwd(), "public/cattles");
const jsonPath = path.join(cattleDir, "cattle.json");

function ensureDir() {
  if (!fs.existsSync(cattleDir)) {
    fs.mkdirSync(cattleDir, { recursive: true });
  }
}

export async function getCattles(): Promise<Cattle[]> {
  ensureDir();

  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
    return [];
  }

  const data = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(data);
}

export async function createCattle(formData: FormData): Promise<void> {
  ensureDir();

  const title = formData.get("title") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !imageFile) return;

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const imageName = `${Date.now()}-${imageFile.name}`;
  fs.writeFileSync(path.join(cattleDir, imageName), buffer);

  const cattles = await getCattles();

  cattles.push({
    id: Date.now(),
    title,
    image: `/cattles/${imageName}`,
    created: new Date().toISOString().split("T")[0],
  });

  fs.writeFileSync(jsonPath, JSON.stringify(cattles, null, 2));
  revalidatePath("/dashboard/cattles");
}

export async function deleteCattle(id: number): Promise<boolean> {
  try {
    const cattles = await getCattles();
    const cattle = cattles.find(c => c.id === id);
    if (!cattle) return false;

    const imgPath = path.join(process.cwd(), "public", cattle.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    fs.writeFileSync(
      jsonPath,
      JSON.stringify(cattles.filter(c => c.id !== id), null, 2)
    );

    revalidatePath("/dashboard/cattles");
    return true;
  } catch {
    return false;
  }
}
