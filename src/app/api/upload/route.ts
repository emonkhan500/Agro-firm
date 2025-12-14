import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, mkdir, stat } from 'fs/promises';

export const runtime = 'nodejs'; // 

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file received' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), 'public/uploads');

    try {
      await stat(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    const uniqueName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueName);

    await writeFile(filePath, buffer);

    return NextResponse.json(
      {
        message: 'Upload successful',
        fileUrl: `/uploads/${uniqueName}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
};
