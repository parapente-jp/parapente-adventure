import path from 'path';
import crypto from 'crypto';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'parapente-jp/parapente-adventure';
const TICKETS_PATH = 'src/data/tickets.json';

export interface Ticket {
    id: string;
    stripeSessionId: string;
    formula: string;
    options: string[];
    price: number;
    customerEmail: string;
    customerName: string;
    customerPhone?: string;
    isGift?: boolean;
    createdAt: string;
    validUntil: string;
    status: 'active' | 'used' | 'expired';
    usedAt?: string;
}

async function readTickets(): Promise<Ticket[]> {
    if (!GITHUB_TOKEN) {
        console.warn('GITHUB_TOKEN not configured, ticket persistence will fail');
        return [];
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Cache-Control': 'no-cache'
            },
        });

        if (!response.ok) return [];

        const data = await response.json();
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading tickets from GitHub:', error);
        return [];
    }
}

async function writeTickets(tickets: Ticket[]): Promise<void> {
    if (!GITHUB_TOKEN) return;

    try {
        // 1. Get current file SHA
        const getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Cache-Control': 'no-cache'
            },
        });

        let sha = '';
        if (getFileResponse.ok) {
            const fileData = await getFileResponse.json();
            sha = fileData.sha;
        }

        // 2. Update file
        const content = JSON.stringify(tickets, null, 2);
        const base64Content = Buffer.from(content).toString('base64');

        await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${TICKETS_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'admin: update tickets database',
                content: base64Content,
                sha: sha || undefined,
                branch: 'main'
            }),
        });
    } catch (error) {
        console.error('Error writing tickets to GitHub:', error);
    }
}

export function generateTicketId(): string {
    return `TKT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'validUntil' | 'status'>): Promise<Ticket> {
    const tickets = await readTickets();

    const now = new Date();
    const validUntil = new Date(now);
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    const ticket: Ticket = {
        id: generateTicketId(),
        ...data,
        createdAt: now.toISOString(),
        validUntil: validUntil.toISOString(),
        status: 'active'
    };

    try {
        tickets.push(ticket);
        await writeTickets(tickets);
    } catch (error) {
        console.warn('Failed to persist ticket, but continuing to return it for user download', error);
    }

    return ticket;
}

export async function getTicket(id: string): Promise<Ticket | null> {
    const tickets = await readTickets();
    return tickets.find(t => t.id === id) || null;
}

export async function getTicketBySession(sessionId: string): Promise<Ticket | null> {
    const tickets = await readTickets();
    // Exact match first, then prefix match for cart-generated tickets
    return tickets.find(t => t.stripeSessionId === sessionId)
        || tickets.find(t => t.stripeSessionId.startsWith(sessionId + '-'))
        || null;
}

export async function validateTicket(id: string): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
    const tickets = await readTickets();
    const ticketIndex = tickets.findIndex(t => t.id === id);

    if (ticketIndex === -1) {
        return { success: false, message: 'Billet introuvable' };
    }

    const ticket = tickets[ticketIndex];

    if (ticket.status === 'used') {
        return {
            success: false,
            message: `Billet déjà utilisé le ${new Date(ticket.usedAt!).toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
            ticket
        };
    }

    if (ticket.status === 'expired' || new Date(ticket.validUntil) < new Date()) {
        return { success: false, message: 'Billet expiré', ticket };
    }

    // Mark as used
    tickets[ticketIndex] = {
        ...ticket,
        status: 'used',
        usedAt: new Date().toISOString()
    };

    await writeTickets(tickets);

    return {
        success: true,
        message: 'Billet validé avec succès !',
        ticket: tickets[ticketIndex]
    };
}

export async function getAllTickets(): Promise<Ticket[]> {
    return readTickets();
}
