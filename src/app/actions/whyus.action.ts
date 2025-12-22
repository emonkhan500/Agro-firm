'use server';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
export interface WhyUs {
  id: string;
  title: string;
  mainImage: string;
  iconImage: string;
  created: string;
  order: number;
}

const WHYUS_DIR = path.join(process.cwd(), 'public/why-us');
const JSON_FILE = path.join(WHYUS_DIR, 'whyus.json');
async function ensureDir() {
  await fs.mkdir(WHYUS_DIR, { recursive: true });
}
async function readJSON(): Promise<WhyUs[]> {
  try {
    return JSON.parse(await fs.readFile(JSON_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

async function writeJSON(data: WhyUs[]) {
  await fs.writeFile(JSON_FILE, JSON.stringify(data, null, 2));
}
// CREATE
export async function createWhyUs(
  formData: FormData,
  payload: { title: string }
): Promise<WhyUs> {
  await ensureDir();

  const main = formData.get('mainImage') as File;
  const icon = formData.get('iconImage') as File;
  if (!main || !icon) throw new Error('Images required');
  const mainName = `${Date.now()}-${main.name}`;
  const iconName = `${Date.now()}-${icon.name}`;

  await fs.writeFile(
    path.join(WHYUS_DIR, mainName),
    Buffer.from(await main.arrayBuffer())
  );
  await fs.writeFile(
    path.join(WHYUS_DIR, iconName),
    Buffer.from(await icon.arrayBuffer())
  );

  const list = await readJSON();
  const item: WhyUs = {
    id: Date.now().toString(),
    title: payload.title,
    mainImage: `/why-us/${mainName}`,
    iconImage: `/why-us/${iconName}`,
    created: new Date().toLocaleDateString(),
    order: list.length,
  };

  list.push(item);
  await writeJSON(list);
  revalidatePath('/dashboard/whyus-management');
  revalidatePath('/');
  return item;
}

// READ
export async function getWhyUs(): Promise<WhyUs[]> {
  return readJSON();
}

//  DELETE
export async function deleteWhyUs(id: string): Promise<WhyUs | null> {
  const list = await readJSON();
  const index = list.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const [deleted] = list.splice(index, 1);
  await fs
    .unlink(path.join(process.cwd(), 'public', deleted.mainImage))
    .catch(() => {});
  await fs
    .unlink(path.join(process.cwd(), 'public', deleted.iconImage))
    .catch(() => {});
  await writeJSON(list.map((i, idx) => ({ ...i, order: idx })));

  revalidatePath('/dashboard/whyus-management');
  revalidatePath('/');
  return deleted;
}

//  UPDATE
export async function updateWhyUs(
  id: string,
  formData: FormData,
  payload: { title: string }
): Promise<WhyUs | null> {
  const list = await readJSON();
  const index = list.findIndex((i) => i.id === id);
  if (index === -1) return null;
  let mainImage = list[index].mainImage;
  const file = formData.get('mainImage') as File | null;
  if (file) {
    await fs
      .unlink(path.join(process.cwd(), 'public', mainImage))
      .catch(() => {});
    const name = `${Date.now()}-${file.name}`;
    await fs.writeFile(
      path.join(WHYUS_DIR, name),
      Buffer.from(await file.arrayBuffer())
    );
    mainImage = `/why-us/${name}`;
  }

  list[index] = { ...list[index], title: payload.title, mainImage };
  await writeJSON(list);
  revalidatePath('/dashboard/whyus-management');
  revalidatePath('/');
  return list[index];
}
