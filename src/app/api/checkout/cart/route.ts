import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27.acacia' as any,
    })
    : null;

interface CartItem {
    formulaId: string;
    formulaName: string;
    price: number;
    options: { id: string; name: string; price: number }[];
    quantity: number;
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('Missing STRIPE_SECRET_KEY');
            return NextResponse.json({ error: 'Config: Clé secrète manquante' }, { status: 500 });
        }
        if (!stripe) {
            console.error('Stripe failed to initialize even with key');
            return NextResponse.json({ error: 'Stripe: Erreur d\'initialisation' }, { status: 500 });
        }
        const { items }: { items: CartItem[] } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
        }

        // Créer les line items pour Stripe
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(item => {
            const optionsTotal = item.options.reduce((sum, opt) => sum + opt.price, 0);
            const unitPrice = item.price + optionsTotal;
            const optionsStr = item.options.length > 0
                ? ` (+ ${item.options.map(o => o.name).join(', ')})`
                : '';

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `Bon Cadeau - ${item.formulaName}`,
                        description: `Baptême parapente${optionsStr} - À utiliser sur rendez-vous`,
                    },
                    unit_amount: unitPrice * 100, // Stripe utilise les centimes
                },
                quantity: item.quantity,
            };
        });

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const successUrl = `${origin}/reservation/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/panier`;
        console.log('Cart checkout redirection URLs:', { successUrl, cancelUrl });

        // Créer la session Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            locale: 'fr',
            metadata: {
                type: 'bon_cadeau',
                items: JSON.stringify(items.map(i => ({
                    name: i.formulaName,
                    qty: i.quantity,
                    options: i.options.map(o => o.name)
                }))),
            },
            custom_text: {
                submit: {
                    message: 'Votre achat est un bon cadeau. Contactez Jean-Philippe au 06 83 03 63 44 pour fixer la date de vol.',
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe cart checkout error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la création du paiement' },
            { status: 500 }
        );
    }
}
