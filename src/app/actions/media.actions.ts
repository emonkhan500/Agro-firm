'use server';

import path from 'path';
import {
  writeFile,
  mkdir,
  stat,
  readFile,
  unlink,
} from 'fs/promises';
import { revalidatePath } from 'next/cache';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const JSON_FILE = path.join(UPLOAD_DIR, 'media.json');

/* -------------------- helpers -------------------- */

async function ensureDir() {
  try {
    await stat(UPLOAD_DIR);
  } catch {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

async function readJSON(): Promise<string[]> {
  try {
    const data = await readFile(JSON_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJSON(data: string[]) {
  await writeFile(JSON_FILE, JSON.stringify(data, null, 2));
}

/* -------------------- CREATE -------------------- */
export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  await ensureDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${fileName}`;

  const media = await readJSON();
  media.unshift(fileUrl);
  await writeJSON(media);

  revalidatePath('/dashboard/media');

  return { fileUrl };
}

/* -------------------- READ -------------------- */
export async function getMedia() {
  return await readJSON();
}

/* -------------------- DELETE -------------------- */
export async function deleteMedia(fileUrl: string) {
  const media = await readJSON();

  const filtered = media.filter((url) => url !== fileUrl);

  const filePath = path.join(process.cwd(), 'public', fileUrl);
  await unlink(filePath).catch(() => {});

  await writeJSON(filtered);
  revalidatePath('/dashboard/media');
}
