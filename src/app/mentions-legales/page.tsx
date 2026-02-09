'use client';

import styles from '../page.module.css'; // Reusing global page styling if possible or standard layout

export default function MentionsLegales() {
    return (
        <main style={{ padding: '120px 20px 60px', maxWidth: '800px', margin: '0 auto', color: '#333', lineHeight: '1.6' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#1A1A1A' }}>Mentions Légales</h1>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>1. Présentation du site</h2>
                <p>
                    En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site <strong>jpparapente05.fr</strong> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :
                </p>
                <p>
                    <strong>Propriétaire / Éditeur</strong> : Jean-Philippe Gayon<br />
                    <strong>Statut</strong> : Entrepreneur Individuel / Moniteur de Parapente diplômé d'État<br />
                    <strong>Adresse</strong> : Orcières Merlette, 05170 Orcières, France<br />
                    <strong>SIRET</strong> : [Numéro SIRET à compléter]<br />
                    <strong>Responsable publication</strong> : Jean-Philippe Gayon – jeanraza@hotmail.fr
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>2. Hébergement</h2>
                <p>
                    <strong>Hébergeur</strong> : Vercel Inc.<br />
                    <strong>Adresse</strong> : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
                    <strong>Site Web</strong> : https://vercel.com
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>3. Propriété intellectuelle</h2>
                <p>
                    Jean-Philippe Gayon est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.
                </p>
                <p>
                    Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Jean-Philippe Gayon.
                </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>4. Limitations de responsabilité</h2>
                <p>
                    Jean-Philippe Gayon ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site jpparapente05.fr.
                </p>
            </section>
        </main>
    );
}
