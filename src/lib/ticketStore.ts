import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface Ticket {
    id: string;
    stripeSessionId: string;
    formula: string;
    options: string[];
    price: number;
    customerEmail: string;
    customerName: string;
    customerPhone?: string;
    createdAt: string;
    validUntil: string;
    status: 'active' | 'used' | 'expired';
    usedAt?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const TICKETS_FILE = path.join(DATA_DIR, 'tickets.json');

async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

async function readTickets(): Promise<Ticket[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(TICKETS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeTickets(tickets: Ticket[]): Promise<void> {
    try {
        await ensureDataDir();
        await fs.writeFile(TICKETS_FILE, JSON.stringify(tickets, null, 2));
    } catch (error) {
        console.warn('Could not write tickets to disk (likely read-only filesystem on Vercel):', error);
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
    return tickets.find(t => t.stripeSessionId === sessionId) || null;
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
            message: `Billet déjà utilisé le ${new Date(ticket.usedAt!).toLocaleDateString('fr-FR')}`,
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
