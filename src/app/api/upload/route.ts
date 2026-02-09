import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const category = formData.get('category') as string;

        if (!file || !category) {
            return NextResponse.json({ error: 'File and category required' }, { status: 400 });
        }

        // Validate category
        const validCategories = ['ete', 'hiver', 'paysage', 'video'];
        if (!validCategories.includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }

        // Create directory path
        const uploadDir = path.join(process.cwd(), 'public', 'gallery', category);
        await fs.mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const ext = path.extname(file.name);
        const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
        const timestamp = Date.now();
        const fileName = `${baseName}-${timestamp}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: `/gallery/${category}/${fileName}`,
            fileName
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

// Get list of files in a category
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        if (!category) {
            return NextResponse.json({ error: 'Category required' }, { status: 400 });
        }

        const galleryDir = path.join(process.cwd(), 'public', 'gallery', category);

        try {
            const files = await fs.readdir(galleryDir);
            const mediaFiles = files.filter(f =>
                /\.(jpg|jpeg|png|gif|webp|mp4|mov|webm)$/i.test(f)
            );
            return NextResponse.json({ files: mediaFiles.map(f => `/gallery/${category}/${f}`) });
        } catch {
            return NextResponse.json({ files: [] });
        }
    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
    }
}
