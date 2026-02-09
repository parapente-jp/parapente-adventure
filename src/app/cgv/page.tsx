'use client';

export default function CGV() {
    return (
        <main style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto', color: '#333', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1A1A1A' }}>Conditions Générales de Vente (CGV)</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>1. Objet</h2>
                <p>
                    Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Jean-Philippe Gayon (le Prestataire) et toute personne effectuant une réservation de baptême de parapente (le Client).
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>2. Réservation et Paiement</h2>
                <p>
                    La réservation peut s&apos;effectuer en ligne, par téléphone ou sur place.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>Paiement en ligne :</strong> Le règlement en ligne s&apos;effectue de manière sécurisée via notre partenaire Stripe. Le paiement intégral est requis lors de la réservation en ligne.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>Paiement sur place :</strong> Si vous réservez par téléphone, le règlement s&apos;effectue le jour du vol. Nous acceptons : espèces, chèques, chèques vacances et Wero.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Les tarifs sont indiqués en euros et TTC.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>3. Conditions d'Annulation</h2>
                <p>
                    <strong>Par le Prestataire :</strong> Le parapente est une activité météo-dépendante. Le pilote est seul juge des conditions de sécurité. En cas de conditions défavorables, le vol peut être reporté ou annulé sans frais. En cas d'annulation par le Prestataire, le Client est intégralement remboursé si un acompte a été versé.
                </p>
                <p>
                    <strong>Par le Client :</strong> Toute annulation par le Client doit être signalée au moins 48 heures avant le rendez-vous. En cas d'annulation tardive ou de non-présentation, le Prestataire se réserve le droit de facturer la prestation ou de conserver l'acompte.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>4. Santé et Sécurité</h2>
                <p>
                    Le Client s&apos;engage à être en bonne condition physique. Il doit signaler tout problème de santé particulier (cardiaque, articulaire, etc.).
                </p>
                <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#dc2626' }}>
                    ⚠️ Les vols en parapente biplace sont proscrits pour les femmes enceintes.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Le pilote se réserve le droit de refuser un passager s&apos;il juge que sa condition ne permet pas un vol en toute sécurité.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    Le port de chaussures fermées (type baskets ou randonnée) et de vêtements adaptés à la saison est obligatoire.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>5. Assurance</h2>
                <p>
                    Le Prestataire est couvert par une Responsabilité Civile Aérienne couvrant ses passagers, conformément à la réglementation en vigueur.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>6. Droit à l'image</h2>
                <p>
                    Sauf avis contraire exprimé au préalable, le Client autorise le Prestataire à utiliser les photos et vidéos prises lors du vol pour sa promotion (site web, réseaux sociaux).
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>7. Litiges</h2>
                <p>
                    Les présentes CGV sont soumises à la loi française. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire auprès des tribunaux compétents.
                </p>
            </section>
        </main>
    );
}
