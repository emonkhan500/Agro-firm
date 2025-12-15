'use server';

import path from 'path';
import { writeFile, mkdir, stat, readFile } from 'fs/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const JSON_FILE = path.join(UPLOAD_DIR, 'media.json');

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) throw new Error('No file provided');

  const buffer = Buffer.from(await file.arrayBuffer());

  // Make sure upload directory exists
  try {
    await stat(UPLOAD_DIR);
  } catch {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }

  // Save file
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${fileName}`;

  // Save/update JSON
  let jsonData: string[] = [];
  try {
    const existingData = await readFile(JSON_FILE, 'utf-8');
    jsonData = JSON.parse(existingData) as string[];
  } catch (err) {
    // If file doesn't exist, start with empty array
    jsonData = [];
  }

  jsonData.unshift(fileUrl); // Add new file to the beginning
  await writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2));

  return { fileUrl };
}
