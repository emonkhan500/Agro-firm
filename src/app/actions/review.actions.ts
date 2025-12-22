'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export interface Review {
  id: number;
  name: string;
  place: string;
  review: string;
  image: string;
  created: string;
}

const reviewDir = path.join(process.cwd(), 'public/reviews');
const jsonPath = path.join(reviewDir, 'review.json');

/* ======================
   Helper
====================== */
function ensureDir() {
  if (!fs.existsSync(reviewDir)) {
    fs.mkdirSync(reviewDir, { recursive: true });
  }
}

/* ======================
   Get Reviews
====================== */
export async function getReviews(): Promise<Review[]> {
  ensureDir();

  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
    return [];
  }

  const data = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(data);
}

/* ======================
   Create Review
====================== */
export async function createReview(formData: FormData): Promise<void> {
  ensureDir();

  const name = formData.get('name') as string;
  const place = formData.get('place') as string;
  const review = formData.get('review') as string;
  const imageFile = formData.get('image') as File;

  if (!name || !place || !review || !imageFile) return;

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const imageName = `${Date.now()}-${imageFile.name}`;
  fs.writeFileSync(path.join(reviewDir, imageName), buffer);

  const reviews = await getReviews();

  reviews.push({
    id: Date.now(),
    name,
    place,
    review,
    image: `/reviews/${imageName}`,
    created: new Date().toISOString().split('T')[0],
  });

  fs.writeFileSync(jsonPath, JSON.stringify(reviews, null, 2));
  revalidatePath('/dashboard/reviews');
}

/* ======================
   Delete Review
====================== */
export async function deleteReview(id: number): Promise<boolean> {
  try {
    const reviews = await getReviews();
    const item = reviews.find((r) => r.id === id);
    if (!item) return false;

    const imgPath = path.join(process.cwd(), 'public', item.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    fs.writeFileSync(
      jsonPath,
      JSON.stringify(
        reviews.filter((r) => r.id !== id),
        null,
        2
      )
    );

    revalidatePath('/dashboard/reviews');
    return true;
  } catch {
    return false;
  }
}
// Update Review
export async function updateReview(
  id: number,
  updatedReview: string
): Promise<boolean> {
  try {
    const reviews = await getReviews();
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) return false;
    reviews[index].review = updatedReview;

    fs.writeFileSync(jsonPath, JSON.stringify(reviews, null, 2));
    revalidatePath('/dashboard/reviews');
    return true;
  } catch {
    return false;
  }
}
