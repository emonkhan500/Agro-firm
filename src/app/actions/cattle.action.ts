'use server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Cattle {
  id: number;
  title: string;
  description: string;
  image: string;
  created: string;
}

const cattleDir = path.join(process.cwd(), 'public/cattles');
const jsonPath = path.join(cattleDir, 'cattle.json');

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

  return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
}

// CREATE
export async function createCattle(formData: FormData) {
  ensureDir();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !description || !imageFile) return;
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const imageName = `${Date.now()}-${imageFile.name}`;
  fs.writeFileSync(path.join(cattleDir, imageName), buffer);
  const cattles = await getCattles();

  cattles.push({
    id: Date.now(),
    title,
    description,
    image: `/cattles/${imageName}`,
    created: new Date().toISOString().split('T')[0],
  });

  fs.writeFileSync(jsonPath, JSON.stringify(cattles, null, 2));
  revalidatePath('/dashboard/cattles');
}

//  UPDATE
export async function updateCattle(id: number, formData: FormData) {
  try {
    ensureDir();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const cattles = await getCattles();
    const index = cattles.findIndex((c) => c.id === id);
    if (index === -1) return false;

    let imagePath = cattles[index].image;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const imageName = `${Date.now()}-${imageFile.name}`;
      fs.writeFileSync(path.join(cattleDir, imageName), buffer);

      const oldImage = path.join(process.cwd(), 'public', imagePath);
      if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);

      imagePath = `/cattles/${imageName}`;
    }

    cattles[index] = {
      ...cattles[index],
      title,
      description,
      image: imagePath,
    };

    fs.writeFileSync(jsonPath, JSON.stringify(cattles, null, 2));
    revalidatePath('/dashboard/cattles');
    return true;
  } catch {
    return false;
  }
}

//  DELETE
export async function deleteCattle(id: number) {
  const cattles = await getCattles();
  const cattle = cattles.find((c) => c.id === id);
  if (!cattle) return false;
  const imgPath = path.join(process.cwd(), 'public', cattle.image);
  if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      cattles.filter((c) => c.id !== id),
      null,
      2
    )
  );
   revalidatePath('/dashboard/cattles');
  return true;
}
