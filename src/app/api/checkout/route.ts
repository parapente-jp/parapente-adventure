import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { formulesEte, formulesHiver } from '@/data/site-config';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

interface CheckoutRequest {
    formulaId: string;
    options: string[];
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    date: string;
    weight: number;
    participants: number;
}

export async function POST(request: NextRequest) {
    try {
        if (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS !== 'true') {
            return NextResponse.json({ error: 'Les paiements en ligne sont temporairement désactivés.' }, { status: 503 });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json({ error: 'Config: Clé secrète manquante' }, { status: 500 });
        }
        if (!stripe) {
            console.error('Stripe failed to initialize even with key');
            return NextResponse.json({ error: 'Stripe: Erreur d\'initialisation' }, { status: 500 });
        }
        const body: CheckoutRequest = await request.json();
        const { formulaId, options, customerName, customerEmail, customerPhone, date, weight, participants } = body;

        // Trouver la formule
        const allFormulas = [...formulesEte, ...formulesHiver];
        const formula = allFormulas.find(f => f.id === formulaId);

        if (!formula) {
            return NextResponse.json({ error: 'Formule non trouvée' }, { status: 400 });
        }

        // Calculer le prix total
        let totalPrice = formula.price * participants;
        const selectedOptions: string[] = [];

        // Ajouter les options si la formule les supporte
        if ('options' in formula && formula.options) {
            for (const optionId of options) {
                const option = formula.options.find((o: { id: string; name: string; price: number }) => o.id === optionId);
                if (option) {
                    totalPrice += option.price * participants;
                    selectedOptions.push(option.name);
                }
            }
        }

        // Créer les line items pour Stripe
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `Baptême Parapente - ${formula.name}`,
                        description: `${formula.duration} • ${date} • ${participants} personne(s)${selectedOptions.length > 0 ? ` • Options: ${selectedOptions.join(', ')}` : ''}`,
                    },
                    unit_amount: totalPrice * 100, // Stripe utilise les centimes
                },
                quantity: 1,
            },
        ];

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const successUrl = `${origin}/reservation/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/reservation/cancel`;
        console.log('Checkout redirection URLs:', { successUrl, cancelUrl });

        // Créer la session Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: customerEmail,
            metadata: {
                formulaId,
                formulaName: formula.name,
                customerName,
                customerPhone,
                date,
                weight: weight.toString(),
                participants: participants.toString(),
                options: selectedOptions.join(','),
            },
            locale: 'fr',
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du paiement' },
            { status: 500 }
        );
    }
}
