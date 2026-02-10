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
                'User-Agent': 'Parapente-Adventure-Admin'
            },
        });

        if (!getFileResponse.ok) {
            const errorText = await getFileResponse.text();
            console.error('GitHub API Get File Error:', getFileResponse.status, errorText);
            return NextResponse.json({
                error: `GitHub Get Error (${getFileResponse.status}): ${errorText.substring(0, 50)}...`
            }, { status: getFileResponse.status });
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
                'User-Agent': 'Parapente-Adventure-Admin'
            },
            body: JSON.stringify({
                message: 'admin: update calendar closures',
                content: Buffer.from(JSON.stringify(closures, null, 2)).toString('base64'),
                sha: sha,
                branch: 'main'
            }),
        });

        if (!updateResponse.ok) {
            const errorText = await updateResponse.text();
            console.error('GitHub API Update Error:', updateResponse.status, errorText);
            return NextResponse.json({
                error: `GitHub Update Error (${updateResponse.status}): ${errorText.substring(0, 50)}...`
            }, { status: updateResponse.status });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Push error:', error);
        return NextResponse.json({ error: 'Erreur interne lors du push' }, { status: 500 });
    }
}
