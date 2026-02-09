import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/closures.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading closures:', error);
        return NextResponse.json({}, { status: 200 }); // Return empty if file doesn't exist yet
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving closures:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
