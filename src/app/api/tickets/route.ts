import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTicket, getTicketBySession, getAllTickets } from '@/lib/ticketStore';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

// POST - Create a new ticket
export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json({ error: 'Config: Clé secrète manquante' }, { status: 500 });
        }
        if (!stripe) {
            console.error('Stripe failed to initialize');
            return NextResponse.json({ error: 'Stripe: Erreur d\'initialisation' }, { status: 500 });
        }
        const body = await request.json();

        const { stripeSessionId } = body;

        if (!stripeSessionId) {
            return NextResponse.json(
                { error: 'Missing stripeSessionId' },
                { status: 400 }
            );
        }

        // Check if ticket already exists for this session
        const existingTicket = await getTicketBySession(stripeSessionId);
        if (existingTicket) {
            return NextResponse.json({ ticket: existingTicket });
        }

        // Retrieve the session from Stripe to get real data
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

        if (!session) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const metadata = session.metadata;
        const ticket = await createTicket({
            stripeSessionId,
            formula: metadata?.formulaName || 'Vol Parapente',
            options: metadata?.options ? metadata.options.split(',') : [],
            price: session.amount_total ? session.amount_total / 100 : 0,
            customerEmail: session.customer_details?.email || '',
            customerName: metadata?.customerName || 'Client',
            customerPhone: metadata?.customerPhone
        });

        return NextResponse.json({ ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: 'Failed to create ticket' },
            { status: 500 }
        );
    }
}

// GET - Get all tickets (for admin)
export async function GET() {
    try {
        const tickets = await getAllTickets();
        return NextResponse.json({ tickets });
    } catch (error) {
        console.error('Error getting tickets:', error);
        return NextResponse.json(
            { error: 'Failed to get tickets' },
            { status: 500 }
        );
    }
}
