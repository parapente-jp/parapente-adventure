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
            console.log('Returning existing ticket for session:', stripeSessionId);
            return NextResponse.json({ ticket: existingTicket });
        }

        // Retrieve the session from Stripe to get real data
        console.log('Retrieving Stripe session:', stripeSessionId);
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);

        if (!session) {
            console.error('Stripe session not found:', stripeSessionId);
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const metadata = session.metadata;
        console.log('Creating ticket for customer:', metadata?.customerName);
        const ticket = await createTicket({
            stripeSessionId,
            formula: metadata?.formulaName || 'Vol Parapente',
            options: metadata?.options ? metadata.options.split(',') : [],
            price: session.amount_total ? session.amount_total / 100 : 0,
            customerEmail: session.customer_details?.email || '',
            customerName: metadata?.customerName || 'Client',
            customerPhone: metadata?.customerPhone
        });

        console.log('Ticket created successfully:', ticket.id);
        return NextResponse.json({ ticket });
    } catch (error: any) {
        console.error('Error creating ticket:', error);
        return NextResponse.json(
            { error: `Failed to create ticket: ${error.message}` },
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
