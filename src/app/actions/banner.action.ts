'use server';

import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

export interface Banner {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  buttonText: string;
  buttonLink: string;
  created: string;
  order: number;
  image: string;
}

const BANNER_DIR = path.join(process.cwd(), 'public/banner');
const JSON_FILE = path.join(BANNER_DIR, 'banner.json');

async function ensureDir() {
  try {
    await fs.stat(BANNER_DIR);
  } catch {
    await fs.mkdir(BANNER_DIR, { recursive: true });
  }
}

async function readJSON(): Promise<Banner[]> {
  try {
    const data = await fs.readFile(JSON_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJSON(data: Banner[]) {
  await fs.writeFile(JSON_FILE, JSON.stringify(data, null, 2));
}

/* -------------------- CREATE -------------------- */
export async function createBanner(
  formData: FormData,
  payload: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    status: 'active' | 'inactive';
  }
): Promise<Banner> {
  await ensureDir();

  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(BANNER_DIR, fileName);
  await fs.writeFile(filePath, buffer);

  const image = `/banner/${fileName}`;
  const banners = await readJSON();

  const newBanner: Banner = {
    ...payload,
    id: Date.now().toString(),
    created: new Date().toLocaleDateString(),
    order: banners.length,
    image,
  };

  banners.push(newBanner);
  await writeJSON(banners);

  revalidatePath('/dashboard/banner-management');
  revalidatePath('/');

  return newBanner;
}

/* -------------------- READ -------------------- */
export async function getBanners(): Promise<Banner[]> {
  return await readJSON();
}

/* -------------------- DELETE -------------------- */
export async function deleteBanner(id: string): Promise<Banner | null> {
  const banners = await readJSON();
  const index = banners.findIndex(b => b.id === id);
  if (index === -1) return null;

  const [deleted] = banners.splice(index, 1);

  const filePath = path.join(process.cwd(), 'public', deleted.image);
  await fs.unlink(filePath).catch(() => {});

  const updatedBanners = banners.map((b, i) => ({ ...b, order: i }));
  await writeJSON(updatedBanners);

  revalidatePath('/dashboard/banner-management');
  revalidatePath('/');

  return deleted;
}
