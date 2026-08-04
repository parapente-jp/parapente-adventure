export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        nav: {
            home: "Accueil",
            tarifs: "Tarifs",
            planning: "Planning",
            gallery: "Galerie",
            contact: "Contact",
            buy: "ACHETER"
        },
        hero: {
            titleMain: "Volez avec",
            titleHighlight: "Parapente Adventure",
            subtitle: "Découvrez le <strong>Champsaur</strong> vu du ciel avec Jean-Philippe, pilote professionnel passionné depuis plus de 25 ans.",
            ctaPrimary: "Réserver mon vol",
            ctaSecondary: "Voir les tarifs",
            stats: {
                flightTime: "Temps de vol",
                altitude: "Altitude max",
                experience: "Expérience",
                flights: "Vols réalisés"
            }
        },
        howItWorks: {
            badge: "🪂 Votre expérience",
            title: "Comment ça se passe ?",
            subtitle: "De la réservation à l'atterrissage, tout ce que vous devez savoir",
            steps: [
                { title: "Réservation", desc: "Appelez-nous pour réserver. Nous confirmons votre créneau selon la météo." },
                { title: "Rendez-vous", desc: "On se retrouve au point d'atterrissage. Prévoyez des vêtements chauds et des chaussures fermées." },
                { title: "Briefing", desc: "Explications de sécurité, présentation du matériel et des consignes de décollage." },
                { title: "Le Vol", desc: "C'est parti pour le grand saut ! Profitez d'une vue époustouflante et laissez-vous porter par les sensations uniques du vol libre." },
                { title: "Souvenirs", desc: "Gardez une trace de votre aventure ! Vos photos et vidéos HD vous attendent pour revivre et partager ces moments exceptionnels." }
            ]
        },
        reassurance: {
            vertigo: {
                title: "Pas de Vertige",
                desc: "Le vertige n'existe pas en parapente car il n'y a pas de lien physique avec le sol. Vous vous sentirez léger et en totale confiance dès le décollage."
            },
            forEveryone: {
                title: "Pour Tous",
                desc: "De 5 à 95 ans, aucune aptitude physique n'est requise. Jean-Phi rend le vol accessible à tous, pour une expérience en toute sérénité."
            },
            listening: {
                title: "À votre écoute",
                desc: "Plutôt contemplatif ou amateur de sensations ? Votre moniteur s'adapte à 100% à vos envies pour que ce vol soit le vôtre."
            }
        },
        formules: {
            badge: "🏷️ Tarifs & Réservation",
            title: "Choisissez votre formule",
            summerMode: "🌞 Été",
            winterMode: "❄️ Hiver",
            popular: "Le plus populaire",
            from: "À partir de",
            weight: "Poids",
            duration: "Durée",
            requirements: "Pré-requis",
            book: "Réserver ce vol",
            options: "Options disponibles",
            optionsAvailable: "Available options:",
            addedToCart: "Ajouté !",
            addToCart: "🛒 Ajouter au panier",
            readyToBook: "Prêt à réserver ?",
            viewCart: "Voir mon panier →",
            perPerson: "par personne",
            summerTitle: "Nos Formules d'Été",
            summerSubtitle: "Découvrez la magie du vol en parapente au-dessus de la vallée du Champsaur",
            winterTitle: "Nos Formules d'Hiver",
            winterSubtitle: "Vivez l'expérience unique du décollage à ski depuis Orcières Merlette"
        },
        formulaData: {
            summer: {
                decouverte: {
                    name: "Découverte",
                    altitude: "800m de dénivelé",
                    description: "Parfait pour une première expérience ! Découvrez la magie du vol en parapente avec un vol d'initiation au-dessus de la magnifique vallée du Champsaur.",
                    features: [
                        "Vol d'environ 15 minutes",
                        "Décollage depuis Orcières, St Léger ou Ancelle",
                        "Vue panoramique sur le Champsaur",
                        "Option vidéo HD disponible"
                    ]
                },
                ascendances: {
                    name: "Ascendances",
                    altitude: "Thermiques & dynamiques",
                    description: "Explorez les ascendances thermiques et dynamiques pour un vol prolongé. Idéal pour ceux qui veulent vraiment profiter de l'expérience.",
                    features: [
                        "Vol d'environ 25 minutes",
                        "Exploitation des thermiques",
                        "Sensations de vol authentiques",
                        "Option vidéo HD disponible"
                    ]
                },
                balade: {
                    name: "Balade Aérienne",
                    altitude: "Vol longue durée",
                    description: "La formule la plus complète ! Une véritable balade aérienne pour admirer toute la beauté de la vallée du Champsaur.",
                    features: [
                        "Vol d'environ 45 minutes",
                        "Tour complet de la vallée",
                        "Expérience immersive",
                        "Option vidéo HD disponible"
                    ]
                }
            },
            winter: {
                decouverte: {
                    name: "Découverte Ski",
                    altitude: "700m de dénivelé",
                    description: "Vivez l'expérience unique du décollage à ski depuis les pistes d'Orcières Merlette avec possibilité de touch and go ! Atterrissage à la station.",
                    features: [
                        "Décollage uniquement à ski",
                        "Vol d'environ 12 minutes",
                        "Touch and go possible",
                        "Vue sur les montagnes enneigées",
                        "Option vidéo HD disponible"
                    ],
                    requirements: ["Savoir descendre une piste bleue facile"]
                },
                grandVol: {
                    name: "Le Grand Vol",
                    altitude: "Vol long",
                    description: "La formule complète hiver avec un vol plus long et la possibilité de touch and go ! Prestation d'environ 1h30.",
                    features: [
                        "Prestation 1h30 au total",
                        "Vol de 25 minutes",
                        "Décollage uniquement à ski",
                        "Touch and go possible",
                        "Option vidéo HD disponible"
                    ],
                    requirements: ["Savoir descendre une piste bleue facile"]
                }
            },
            options: {
                acrobatie: "Acrobatie",
                pilotage: "Pilotage",
                "photo-video": "Photo/Vidéo"
            }
        },
        videoOption: {
            title: "Option Vidéo & Photos HD",
            desc: "Vivez votre vol à nouveau ! Jean-Philippe filme votre aventure en HD. Repartez immédiatement avec vos souvenirs sur carte Micro SD.",
            price: "25€"
        },
        about: {
            badge: "👨‍✈️ Votre Pilote",
            subtitle: "Moniteur de parapente & Instructeur paramoteur",
            expText: "ans d'expérience",
            desc1: "Professionnel à temps plein depuis plus de <strong>25 ans</strong> dans la magnifique vallée du Champsaur et des Pyrénées, je suis passionné par le vol libre et le partage de cette passion avec vous.",
            desc2: "Ma priorité : votre <strong>sécurité</strong> et votre <strong>plaisir</strong>. Chaque vol est une nouvelle aventure, où je <strong>m'adapte entièrement à vos envies</strong> pour vous offrir une expérience unique et inoubliable au-dessus des sommets des Hautes-Alpes.",
            contact: "Me contacter"
        },
        cta: {
            titleHiver: "PRÊT POUR L'AVENTURE HIVERNALE ?",
            subtitleHiver: "Réservez votre baptême de parapente en ski dès maintenant",
            titleEte: "PRÊT POUR LE GRAND SAUT ?",
            subtitleEte: "Réservez votre baptême de parapente au-dessus du Champsaur",
            book: "Voir les tarifs"
        },
        footer: {
            desc: "Baptême de parapente biplace été et hiver dans la vallée du Champsaur. Plus de 25 ans d'expérience au service de votre sécurité et de vos sensations.",
            nav: "NAVIGATION",
            formules: "NOS FORMULES",
            contact: "CONTACT",
            legal: {
                mentions: "Mentions Légales",
                cookies: "Cookies",
                privacy: "Confidentialité"
            },
            partner: "Partenaire : Adrenactive",
            rights: "Tous droits réservés."
        },
        testimonials: {
            badge: "💬 Témoignages",
            title: "Ce que disent nos passagers",
            subtitle: "Découvrez les avis de ceux qui ont vécu l'expérience du vol en parapente",
            viewTestimonial: "Voir témoignage",
            previousTestimonial: "Témoignage précédent",
            nextTestimonial: "Témoignage suivant",
            flownWithUs: "Vous avez volé avec nous ?",
            leaveReview: "Laissez votre avis →"
        },
        galleryPreview: {
            badge: "📸 Galerie",
            title: "Immortalisez l'expérience",
            subtitle: "Quelques images de nos vols au-dessus de la vallée du Champsaur",
            viewAll: "Voir toute la galerie",
            videoNote: "Option vidéo HD disponible pour chaque vol",
            categories: {
                summer: "Été",
                winter: "Hiver",
                landscape: "Paysage"
            }
        },
        // Page-specific translations
        gallery: {
            title: "Photos & Vidéos",
            subtitle: "Revivez les plus beaux moments de nos vols au-dessus du Champsaur",
            all: "Tous",
            summer: "Été",
            winter: "Hiver",
            landscape: "Paysage",
            videoOption: {
                title: "Option Vidéo HD",
                desc: "Immortalisez votre vol avec une vidéo HD professionnelle. À demander avant le décollage !"
            }
        },
        contact: {
            title: "Contactez-moi",
            subtitle: "Une question ? Une réservation ? Je suis à votre écoute",
            instructor: "Moniteur de parapente",
            instructorParamotor: "Instructeur paramoteur",
            yearsExp: "années d'expérience",
            bio: "Professionnel à temps plein depuis plus de 25 ans dans la vallée du Champsaur et des Pyrénées. Je suis passionné par le vol libre et le partage de cette passion. Au plaisir de vous accueillir !",
            myContact: "Mes coordonnées",
            phone: "Téléphone",
            email: "Email",
            location: "Localisation",
            readyToBook: "Prêt à réserver votre vol ?",
            bookNow: "Réserver maintenant",
            whereToFind: "📍 Où nous trouver",
            flightsFrom: "Vols depuis Orcières Merlette, Ancelle et Saint-Léger dans la vallée du Champsaur"
        },
        planning: {
            title: "Planning des Vols",
            subtitle: "Consultez les disponibilités et appelez pour réserver",
            seasonWinter: "❄️ Saison Hiver",
            seasonSummer: "☀️ Saison Été",
            available: "✓ Disponible",
            closed: "Fermé",
            weatherNote: "Les vols sont soumis aux conditions météorologiques. Appelez-nous le matin du vol pour confirmation.",
            callToBook: "Appelez pour réserver",
            closureReasons: {
                wind: "Vent",
                rain: "Pluie",
                fog: "Brouillard",
                other: "Autre"
            },
            days: {
                mon: "Lun",
                tue: "Mar",
                wed: "Mer",
                thu: "Jeu",
                fri: "Ven",
                sat: "Sam",
                sun: "Dim"
            }
        },
        reservation: {
            title: "Réservation",
            yourSelection: "Votre sélection",
            yourInfo: "Vos informations",
            summary: "Récapitulatif",
            formula: "Formule",
            options: "Options",
            total: "Total",
            firstName: "Prénom",
            lastName: "Nom",
            email: "Email",
            phone: "Téléphone",
            weight: "Poids (kg)",
            notes: "Notes / Commentaires",
            continue: "Continuer",
            pay: "Payer",
            back: "Retour",
            paySecure: "Paiement sécurisé par Stripe",
            cart: {
                title: "Votre panier",
                heroTitle: 'Votre Panier',
                heroSubtitle: 'Finalisez votre commande de vols et bons cadeaux',
                giftNotice: 'Achat de votre ticket :',
                giftNoticeText: 'Votre paiement ne valide pas une date fixe. Pour réserver votre créneau ou pour voler en même temps à plusieurs (vols simultanés possibles en été), appelez Jean-Philippe au',
                giftNoticeEnd: 'avant ou après votre achat afin de choisir ensemble le jour idéal selon la météo.',
                empty: "Votre panier est vide",
                emptyText: 'Ajoutez un vol pour commencer votre aventure !',
                viewFormulas: 'Voir les formules',
                availableOptions: 'Options disponibles :',
                acrobatie: 'Acrobatie',
                pilotage: 'Initiation Pilotage',
                'photo-video': '📷 Photo/Vidéo — à demander sur place',
                'bon-cadeau': '🎁 Bon Cadeau (PDF à offrir)',
                bonCadeauHint: 'Un PDF cadeau sera disponible au téléchargement après le paiement',
                clearCart: 'Vider le panier',
                summary: 'Récapitulatif',
                contraindications: 'Contre-indications importantes',
                contraPregnant: 'Activité proscrite pour les femmes enceintes.',
                contraHandicap: 'Pas de qualification pour faire voler les personnes handicapées (PMR).',
                pay: 'Payer',
                redirecting: 'Redirection...',
                removeItem: "Supprimer",
                checkout: "Commander",
                continueShopping: "Continuer mes achats",
                total: 'Total',
                securePayment: '🔒 Paiement sécurisé par Stripe',
                connectionError: 'Erreur de connexion. Veuillez réessayer.',
                paymentError: 'Erreur lors de la création du paiement',
            },
            success: {
                title: "Paiement confirmé !",
                thanks: "Merci pour votre achat",
                thanksSubtitle: "Votre paiement a bien été reçu.",
                warning: "⚠️ IMPORTANT : Votre achat ne constitue pas une réservation de date de vol",
                warningText: "Pour planifier votre vol, vous devez contacter Jean-Philippe directement par téléphone. Les vols sont soumis aux conditions météorologiques.",
                actionRequired: "ACTION REQUISE",
                callNow: "Appeler maintenant",
                downloadTicket: "Télécharger mon billet PDF",
                ticketInfo: "Conservez ce billet, il contient un QR code unique qui sera scanné le jour du vol.",
                yourTicket: "Votre billet",
                reference: "Référence",
                validUntil: "Valable jusqu'au",
                backHome: "Retour à l'accueil",
                paymentReference: "Référence paiement",
                confirming: "Confirmation en cours...",
                generating: "Génération en cours...",
                errorNotFound: "Billet non trouvé dans la base de données. Essayez de rafraîchir ou contactez Jean-Philippe.",
                errorTechnical: "Erreur technique",
                errorConnection: "Erreur de connexion",
                errorPDF: "Erreur lors de la génération du PDF. Veuillez réessayer."
            },
            cancel: {
                title: "Paiement annulé",
                subtitle: "Votre paiement a été annulé. Aucun montant n'a été débité.",
                problem: "🤔 Un problème ?",
                reasonsTitle: "Plusieurs raisons peuvent expliquer cette annulation :",
                reason1: "Vous avez changé d'avis sur la formule",
                reason2: "Vous souhaitez vérifier vos disponibilités",
                reason3: "Problème avec votre moyen de paiement",
                payOnSite: "💰 Paiement sur place",
                payOnSiteText: "Vous pouvez aussi réserver par téléphone et payer directement sur place. Nous acceptons :",
                contactUs: "📞 Contactez-nous",
                contactText: "Jean-Philippe est disponible pour répondre à vos questions :",
                englishSpoken: "English spoken",
                retry: "Réessayer la réservation",
                backHome: "Retour à l'accueil"
            }
        },
        tarifs: {
            paymentOnSite: "Paiement sur place",
            paymentMethods: "Chèques, Chèques vacances, Espèces et Wero",
            atTakeoff: "Au décollage : ",
            winterNote: {
                title: "Réservation Hiver",
                desc: "L'activité est tributaire des conditions météorologiques. En hiver, présentez-vous directement à notre point de rendez-vous ou appelez-nous pour vérifier l'ouverture du site."
            },
            summerNote: {
                title: "Vols en groupe",
                desc: "En été, nous sommes 2 ou 3 moniteurs disponibles chaque jour. C'est l'idéal pour voler en même temps ! Appelez-nous pour coordonner vos créneaux."
            }
        },
        pdf: {
            title: "Bon Cadeau / Billet de Vol",
            scanInstruction: "Présentez ce QR code le jour du vol",
            flightDetails: "DÉTAILS DU VOL",
            includedOptions: "Options incluses :",
            beneficiary: "Bénéficiaire",
            pricePaid: "Prix payé",
            purchaseDate: "Date d'achat",
            validUntil: "Valable jusqu'au",
            important: "IMPORTANT",
            warningText: "Ce billet ne constitue pas une réservation de date. Appelez Jean-Philippe pour convenir de votre date de vol :",
            phone: "Tel : 06 83 03 63 44"
        },
        giftPdf: {
            mainTitle: "BON CADEAU",
            subtitle: "Offrez un baptême de parapente inoubliable",
            includedOptions: "Options incluses :",
            offeredBy: "Offert par :",
            forRecipient: "Pour :",
            personalMessage: "Message personnel :",
            value: "Valeur",
            validUntil: "Valable jusqu'au",
            howToBook: "Comment réserver ?",
            howToBookText: "Appelez Jean-Philippe au 06 83 03 63 44 pour convenir de la date de vol idéale selon la météo."
        }
    },
    en: {
        nav: {
            home: "Home",
            tarifs: "Pricing",
            planning: "Planning",
            gallery: "Gallery",
            contact: "Contact",
            buy: "BUY NOW"
        },
        hero: {
            titleMain: "Fly with",
            titleHighlight: "Parapente Adventure",
            subtitle: "Discover the <strong>Champsaur</strong> valley from the sky with Jean-Philippe, a professional pilot passionate for over 25 years.",
            ctaPrimary: "Book my flight",
            ctaSecondary: "View prices",
            stats: {
                flightTime: "Flight time",
                altitude: "Max altitude",
                experience: "Experience",
                flights: "Flights completed"
            }
        },
        howItWorks: {
            badge: "🪂 Your experience",
            title: "How does it work?",
            subtitle: "From booking to landing, everything you need to know",
            steps: [
                { title: "Booking", desc: "Call us to book. We confirm your slot according to the weather." },
                { title: "Meeting", desc: "We meet at the landing point. Bring warm clothes and closed shoes." },
                { title: "Briefing", desc: "Safety explanations, presentation of equipment and takeoff instructions." },
                { title: "The Flight", desc: "Time to fly! Enjoy breathtaking views and experience the unique sensations of free flight." },
                { title: "Memories", desc: "Capture your adventure! Your HD photos and videos are ready for you to relive and share these exceptional moments." }
            ]
        },
        reassurance: {
            vertigo: {
                title: "No Vertigo",
                desc: "Vertigo doesn't exist in paragliding because there's no physical link to the ground. You'll feel light and completely confident from takeoff."
            },
            forEveryone: {
                title: "For Everyone",
                desc: "From 5 to 95 years old, no physical skills are required. Jean-Phi makes flying accessible to everyone for a serene experience."
            },
            listening: {
                title: "Listening to you",
                desc: "Contemplative or thrill-seeker? Your instructor adapts 100% to your desires to make this flight truly yours."
            }
        },
        formules: {
            badge: "🏷️ Prices & Booking",
            title: "Choose your formula",
            summerMode: "🌞 Summer",
            winterMode: "❄️ Winter",
            popular: "Most popular",
            from: "Starting at",
            weight: "Weight",
            duration: "Duration",
            requirements: "Requirements",
            book: "Book this flight",
            options: "Available options",
            optionsAvailable: "Available options:",
            addedToCart: "Added!",
            addToCart: "🛒 Add to cart",
            readyToBook: "Ready to book?",
            viewCart: "View my cart →",
            perPerson: "per person",
            summerTitle: "Our Summer Formulas",
            summerSubtitle: "Discover the magic of paragliding over the Champsaur valley",
            winterTitle: "Our Winter Formulas",
            winterSubtitle: "Experience the unique thrill of taking off on skis from Orcières Merlette"
        },
        formulaData: {
            summer: {
                decouverte: {
                    name: "Discovery",
                    altitude: "800m altitude drop",
                    description: "Perfect for a first experience! Discover the magic of paragliding with an introductory flight over the magnificent Champsaur valley.",
                    features: [
                        "Approximately 15-minute flight",
                        "Takeoff from Orcières, St Léger or Ancelle",
                        "Panoramic view of the Champsaur",
                        "HD video option available"
                    ]
                },
                ascendances: {
                    name: "Thermals",
                    altitude: "Thermals & dynamics",
                    description: "Explore thermal and dynamic updrafts for an extended flight. Ideal for those who really want to enjoy the experience.",
                    features: [
                        "Approximately 25-minute flight",
                        "Thermal exploitation",
                        "Authentic flight sensations",
                        "HD video option available"
                    ]
                },
                balade: {
                    name: "Aerial Tour",
                    altitude: "Long duration flight",
                    description: "The most complete formula! A true aerial tour to admire all the beauty of the Champsaur valley.",
                    features: [
                        "Approximately 45-minute flight",
                        "Complete valley tour",
                        "Immersive experience",
                        "HD video option available"
                    ]
                }
            },
            winter: {
                decouverte: {
                    name: "Ski Discovery",
                    altitude: "700m altitude drop",
                    description: "Experience the unique thrill of ski takeoff from the Orcières Merlette slopes with the possibility of touch and go! Landing at the resort.",
                    features: [
                        "Ski takeoff only",
                        "Approximately 12-minute flight",
                        "Touch and go possible",
                        "View of the snowy mountains",
                        "HD video option available"
                    ],
                    requirements: ["Ability to ski down an easy blue run"]
                },
                grandVol: {
                    name: "The Grand Flight",
                    altitude: "Long flight",
                    description: "The complete winter formula with a longer flight and the possibility of touch and go! Approximately 1h30 total experience.",
                    features: [
                        "1h30 total experience",
                        "25-minute flight",
                        "Ski takeoff only",
                        "Touch and go possible",
                        "HD video option available"
                    ],
                    requirements: ["Ability to ski down an easy blue run"]
                }
            },
            options: {
                acrobatie: "Acrobatics",
                pilotage: "Piloting",
                "photo-video": "Photo/Video"
            }
        },
        videoOption: {
            title: "Video & HD Photos Option",
            desc: "Relive your flight! Jean-Philippe records your adventure in HD. Leave immediately with your memories on a Micro SD card.",
            price: "25€"
        },
        about: {
            badge: "👨‍✈️ Your Pilot",
            subtitle: "Paragliding Monitor & Paramotor Instructor",
            expText: "years of experience",
            desc1: "A full-time professional for over <strong>25 years</strong> in the beautiful Champsaur valley and the Pyrenees, I am passionate about free flight and sharing this passion with you.",
            desc2: "My priority: your <strong>safety</strong> and your <strong>pleasure</strong>. Each flight is a new adventure, where I <strong>fully adapt to your desires</strong> to offer you a unique and unforgettable experience above the peaks of the Hautes-Alpes.",
            contact: "Contact me"
        },
        cta: {
            titleHiver: "READY FOR THE WINTER ADVENTURE?",
            subtitleHiver: "Book your ski paragliding tandem now",
            titleEte: "READY FOR THE BIG LEAP?",
            subtitleEte: "Book your paragliding tandem over the Champsaur",
            book: "View prices"
        },
        footer: {
            desc: "Tandem paragliding flights in summer and winter in the Champsaur valley. Over 25 years of experience dedicated to your safety and sensations.",
            nav: "NAVIGATION",
            formules: "OUR FORMULAS",
            contact: "CONTACT",
            legal: {
                mentions: "Legal Notice",
                cookies: "Cookies",
                privacy: "Privacy Policy"
            },
            partner: "Partner: Adrenactive",
            rights: "All rights reserved."
        },
        testimonials: {
            badge: "💬 Testimonials",
            title: "What our passengers say",
            subtitle: "Discover the reviews of those who experienced paragliding",
            viewTestimonial: "View testimonial",
            previousTestimonial: "Previous testimonial",
            nextTestimonial: "Next testimonial",
            flownWithUs: "Have you flown with us?",
            leaveReview: "Leave your review →"
        },
        galleryPreview: {
            badge: "📸 Gallery",
            title: "Capture the experience",
            subtitle: "Some images from our flights over the Champsaur valley",
            viewAll: "View full gallery",
            videoNote: "HD video option available for every flight",
            categories: {
                summer: "Summer",
                winter: "Winter",
                landscape: "Landscape"
            }
        },
        // Page-specific translations
        gallery: {
            title: "Photos & Videos",
            subtitle: "Relive the most beautiful moments of our flights over the Champsaur",
            all: "All",
            summer: "Summer",
            winter: "Winter",
            landscape: "Landscape",
            videoOption: {
                title: "HD Video Option",
                desc: "Capture your flight with a professional HD video. Ask before takeoff!"
            }
        },
        contact: {
            title: "Contact me",
            subtitle: "Any questions? Want to book? I'm here to help",
            instructor: "Paragliding instructor",
            instructorParamotor: "Paramotor instructor",
            yearsExp: "years of experience",
            bio: "Full-time professional for over 25 years in the Champsaur valley and the Pyrenees. I am passionate about free flight and sharing this passion. Looking forward to welcoming you!",
            myContact: "My contact details",
            phone: "Phone",
            email: "Email",
            location: "Location",
            readyToBook: "Ready to book your flight?",
            bookNow: "Book now",
            whereToFind: "📍 Where to find us",
            flightsFrom: "Flights from Orcières Merlette, Ancelle and Saint-Léger in the Champsaur valley"
        },
        planning: {
            title: "Flight Schedule",
            subtitle: "Check availability and call to book",
            seasonWinter: "❄️ Winter Season",
            seasonSummer: "☀️ Summer Season",
            available: "✓ Available",
            closed: "Closed",
            weatherNote: "Flights are subject to weather conditions. Call us on the morning of your flight for confirmation.",
            callToBook: "Call to book",
            closureReasons: {
                wind: "Wind",
                rain: "Rain",
                fog: "Fog",
                other: "Other"
            },
            days: {
                mon: "Mon",
                tue: "Tue",
                wed: "Wed",
                thu: "Thu",
                fri: "Fri",
                sat: "Sat",
                sun: "Sun"
            }
        },
        reservation: {
            title: "Booking",
            yourSelection: "Your selection",
            yourInfo: "Your information",
            summary: "Summary",
            formula: "Formula",
            options: "Options",
            total: "Total",
            firstName: "First name",
            lastName: "Last name",
            email: "Email",
            phone: "Phone",
            weight: "Weight (kg)",
            notes: "Notes / Comments",
            continue: "Continue",
            pay: "Pay",
            back: "Back",
            paySecure: "Secure payment by Stripe",
            cart: {
                title: "Your cart",
                heroTitle: 'Your Cart',
                heroSubtitle: 'Complete your flight and gift voucher order',
                giftNotice: 'Ticket Purchase:',
                giftNoticeText: 'Your payment does not validate a fixed date. To book your slot or to fly together with others (simultaneous flights available in summer), call Jean-Philippe at',
                giftNoticeEnd: 'before or after your purchase to choose the ideal day together based on weather.',
                empty: "Your cart is empty",
                emptyText: 'Add a flight to start your adventure!',
                viewFormulas: 'View formulas',
                availableOptions: 'Available options:',
                acrobatie: 'Acrobatics',
                pilotage: 'Piloting Introduction',
                'photo-video': '📷 Photo/Video — ask on site',
                'bon-cadeau': '🎁 Gift Certificate (PDF to offer)',
                bonCadeauHint: 'A gift PDF will be available for download after payment',
                clearCart: 'Clear cart',
                summary: 'Summary',
                contraindications: 'Important contraindications',
                contraPregnant: 'Activity prohibited for pregnant women.',
                contraHandicap: 'No qualification to fly people with disabilities (PMR).',
                pay: 'Pay',
                redirecting: 'Redirecting...',
                removeItem: "Remove",
                checkout: "Checkout",
                continueShopping: "Continue shopping",
                total: 'Total',
                securePayment: '🔒 Secure payment by Stripe',
                connectionError: 'Connection error. Please try again.',
                paymentError: 'Error creating payment',
            },
            success: {
                title: "Payment confirmed!",
                thanks: "Thank you for your purchase",
                thanksSubtitle: "Your payment has been successfully received.",
                warning: "⚠️ IMPORTANT: Your purchase does not constitute a flight date reservation",
                warningText: "To schedule your flight, you must contact Jean-Philippe directly by phone. Flights are subject to weather conditions.",
                actionRequired: "ACTION REQUIRED",
                callNow: "Call now",
                downloadTicket: "Download my PDF ticket",
                ticketInfo: "Keep this ticket, it contains a unique QR code that will be scanned on the day of your flight.",
                yourTicket: "Your ticket",
                reference: "Reference",
                validUntil: "Valid until",
                backHome: "Back to home",
                paymentReference: "Payment reference",
                confirming: "Confirmation in progress...",
                generating: "Generating...",
                errorNotFound: "Ticket not found in the database. Please try refreshing or contact Jean-Philippe.",
                errorTechnical: "Technical error",
                errorConnection: "Connection error",
                errorPDF: "Error generating PDF. Please try again."
            },
            cancel: {
                title: "Payment cancelled",
                subtitle: "Your payment has been cancelled. No amount has been charged.",
                problem: "🤔 A problem?",
                reasonsTitle: "Several reasons can explain this cancellation:",
                reason1: "You changed your mind about the formula",
                reason2: "You want to check your availability",
                reason3: "Problem with your payment method",
                payOnSite: "💰 Pay on site",
                payOnSiteText: "You can also book by phone and pay directly on site. We accept:",
                contactUs: "📞 Contact us",
                contactText: "Jean-Philippe is available to answer your questions:",
                englishSpoken: "English spoken",
                retry: "Retry booking",
                backHome: "Back to home"
            }
        },
        tarifs: {
            paymentOnSite: "Payment on site",
            paymentMethods: "Checks, Holiday vouchers, Cash and Wero",
            atTakeoff: "At takeoff: ",
            winterNote: {
                title: "Winter Booking",
                desc: "Activity is weather-dependent. In winter, come directly to our meeting point or call us to check if the site is open."
            },
            summerNote: {
                title: "Group Flights",
                desc: "In summer, 2 or 3 instructors are available daily. Perfect for flying together! Call us to coordinate your slots."
            }
        },
        pdf: {
            title: "Gift Voucher / Flight Ticket",
            scanInstruction: "Present this QR code on the day of the flight",
            flightDetails: "FLIGHT DETAILS",
            includedOptions: "Included options:",
            beneficiary: "Beneficiary",
            pricePaid: "Price paid",
            purchaseDate: "Purchase date",
            validUntil: "Valid until",
            important: "IMPORTANT",
            warningText: "This ticket does not constitute a date reservation. Call Jean-Philippe to agree on your flight date:",
            phone: "Tel: 06 83 03 63 44"
        },
        giftPdf: {
            mainTitle: "GIFT CERTIFICATE",
            subtitle: "Offer an unforgettable paragliding experience",
            includedOptions: "Included options:",
            offeredBy: "Offered by:",
            forRecipient: "For:",
            personalMessage: "Personal message:",
            value: "Value",
            validUntil: "Valid until",
            howToBook: "How to book?",
            howToBookText: "Call Jean-Philippe at 06 83 03 63 44 to arrange the ideal flight date based on weather."
        }
    }
};
