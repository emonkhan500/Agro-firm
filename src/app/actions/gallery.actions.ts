'use server';

import fs from "fs";
import path from "path";

export interface GalleryItem {
  id: string;
  title: string;
  coverImage: string;
  thumbnails: {
    src: string;
    rowSpan: string;
    colSpan: string;
  }[];
  images: string[];
  description?: string;
  created: string;
}

const sizeMap = {
  small: { rowSpan: "row-span-1", colSpan: "col-span-1" },
  medium: { rowSpan: "row-span-2", colSpan: "col-span-2" },
  large: { rowSpan: "row-span-3", colSpan: "col-span-3" },
};

const galleryDir = path.join(process.cwd(), "public/gallery");
const jsonPath = path.join(galleryDir, "gallery.json");

const ensureDir = () => {
  if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });
};

const readJson = (): GalleryItem[] => {
  if (!fs.existsSync(jsonPath)) return [];
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
};

const writeJson = (data: GalleryItem[]) => {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
};

const saveFile = async (file: File, folder: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const dir = path.join(galleryDir, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), buffer);
  return `/gallery/${folder}/${fileName}`;
};

// ---------------- CREATE ----------------
export async function createGalleryItem(payload: {
  title: string;
  coverImage?: File;
  thumbnails?: File[];
  images?: File[];
  description?: string;
  size: "small" | "medium" | "large";
}) {
  ensureDir();
  const data = readJson();

  const cover = payload.coverImage ? await saveFile(payload.coverImage, "covers") : "";

  const thumbs = payload.thumbnails
    ? await Promise.all(
        payload.thumbnails.map(async (f) => ({
          src: await saveFile(f, "thumbnails"),
          ...sizeMap[payload.size],
        }))
      )
    : [];

  const images = payload.images
    ? await Promise.all(payload.images.map((f) => saveFile(f, "images")))
    : [];

  const item: GalleryItem = {
    id: Date.now().toString(),
    title: payload.title,
    coverImage: cover,
    thumbnails: thumbs,
    images,
    description: payload.description,
    created: new Date().toLocaleDateString(),
  };

  data.push(item);
  writeJson(data);
  return item;
}

// ---------------- DELETE ----------------
export async function deleteGalleryItem(id: string) {
  const data = readJson();
  writeJson(data.filter(i => i.id !== id));
}

// ---------------- GET ----------------
export async function getGalleryList() {
  return readJson();
}

// ---------------- UPDATE ----------------
export async function updateGalleryItem(
  id: string,
  payload: {
    title?: string;
    coverImage?: File;
    thumbnails?: File[];
    images?: File[];
    description?: string;
    size?: "small" | "medium" | "large";
  }
) {
  ensureDir();
  const data = readJson();

  const index = data.findIndex(item => item.id === id);
  if (index === -1) throw new Error("Item not found");

  const item = data[index];

  let cover = item.coverImage;
  if (payload.coverImage) {
    cover = await saveFile(payload.coverImage, "covers");
  }

  const thumbs = payload.thumbnails
    ? await Promise.all(
        payload.thumbnails.map(async f => ({
          src: await saveFile(f, "thumbnails"),
          ...sizeMap[payload.size || "small"],
        }))
      )
    : item.thumbnails;

  const images = payload.images
    ? await Promise.all(payload.images.map(f => saveFile(f, "images")))
    : item.images;

  data[index] = {
    ...item,
    title: payload.title ?? item.title,
    coverImage: cover,
    thumbnails: thumbs,
    images: images,
    description: payload.description ?? item.description,
    created: item.created, // keep original created date
  };

  writeJson(data);
  return data[index];
}
