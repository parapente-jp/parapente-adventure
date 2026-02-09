import { NextRequest, NextResponse } from 'next/server';

const GITHUB_REPO = 'parapente-jp/parapente-adventure';
const FILE_PATH = 'src/data/closures.json';

export async function POST(request: NextRequest) {
    try {
        const { closures } = await request.json();
        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            console.error('GITHUB_TOKEN not found');
            return NextResponse.json({ error: 'GitHub token non configuré' }, { status: 500 });
        }

        // 1. Get the current file SHA from GitHub
        const getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!getFileResponse.ok) {
            console.error('Failed to get file from GitHub:', await getFileResponse.text());
            return NextResponse.json({ error: 'Erreur lors de la récupération du fichier GitHub' }, { status: 500 });
        }

        const fileData = await getFileResponse.json();
        const sha = fileData.sha;

        // 2. Update the file on GitHub
        const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'admin: update calendar closures',
                content: Buffer.from(JSON.stringify(closures, null, 2)).toString('base64'),
                sha: sha,
                branch: 'main'
            }),
        });

        if (!updateResponse.ok) {
            console.error('Failed to update file on GitHub:', await updateResponse.text());
            return NextResponse.json({ error: 'Erreur lors de la mise à jour sur GitHub' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Push error:', error);
        return NextResponse.json({ error: 'Erreur interne lors du push' }, { status: 500 });
    }
}
