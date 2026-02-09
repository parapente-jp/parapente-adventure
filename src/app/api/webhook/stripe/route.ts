import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-01-28.clover' as any,
    })
    : null;


export async function POST(request: NextRequest) {
    if (!stripe) {
        return NextResponse.json({ error: 'Stripe non configuré' }, { status: 500 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return NextResponse.json({ error: 'Webhook secret non configuré' }, { status: 500 });
    }
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Gérer les différents types d'événements
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;

            // Récupérer les métadonnées de la réservation
            const metadata = session.metadata;

            console.log('=== NOUVELLE RÉSERVATION PAYÉE ===');
            console.log('Client:', metadata?.customerName);
            console.log('Email:', session.customer_email);
            console.log('Téléphone:', metadata?.customerPhone);
            console.log('Formule:', metadata?.formulaName);
            console.log('Date:', metadata?.date);
            console.log('Poids:', metadata?.weight, 'kg');
            console.log('Participants:', metadata?.participants);
            console.log('Options:', metadata?.options || 'Aucune');
            console.log('Montant:', session.amount_total! / 100, '€');
            console.log('==================================');

            // TODO: Envoyer un email de confirmation
            // TODO: Enregistrer dans une base de données si nécessaire

            break;
        }

        case 'checkout.session.expired': {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('Session expirée pour:', session.customer_email);
            break;
        }

        default:
            console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
