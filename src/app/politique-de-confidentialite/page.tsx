'use client';

export default function PolitiqueConfidentialite() {
    return (
        <main style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto', color: '#333', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1A1A1A' }}>Politique de Confidentialité</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>1. Collecte de l'information</h2>
                <p>
                    Nous recueillons des informations lorsque vous nous contactez via le formulaire de contact ou par téléphone. Les informations recueillies incluent votre nom, votre adresse e-mail et votre numéro de téléphone.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>2. Utilisation des informations</h2>
                <p>
                    Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                </p>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>Vous contacter par e-mail ou téléphone pour répondre à vos demandes de réservation.</li>
                    <li>Améliorer le service client et vos besoins de prise en charge.</li>
                </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>3. Confidentialité des données</h2>
                <p>
                    Nous sommes les seuls propriétaires des informations collectées sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>4. Protection des informations</h2>
                <p>
                    Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Seul le propriétaire du site a accès aux informations personnelles identifiables.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>5. Consentement</h2>
                <p>
                    En utilisant notre site, vous consentez à notre politique de confidentialité.
                </p>
            </section>
        </main>
    );
}
