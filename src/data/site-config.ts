export const siteConfig = {
  name: "Parapente Adventure",
  description: "Baptême de parapente biplace été et hiver à Orcières Merlette et dans la vallée du Champsaur. +25 ans d'expérience. Réservez votre vol !",
  url: "https://www.jpparapente05.fr",
  phone: "06 83 03 63 44",
  phoneLink: "tel:+33683036344",
  email: "jeanraza@hotmail.fr",
  location: {
    city: "Orcières Merlette",
    region: "Hautes-Alpes",
    department: "05",
    valley: "Champsaur"
  },
  owner: {
    name: "Jean-Philippe Gayon",
    firstName: "Jean-Philippe",
    experience: "25+ ans",
    titles: ["Moniteur de parapente", "Instructeur paramoteur"]
  },
  social: {
    facebook: "",
    instagram: "",
    youtube: ""
  }
};

export const navigation = [
  { id: "home", name: "Accueil", href: "/" },
  {
    id: "tarifs",
    name: "Tarifs",
    href: "/tarifs"
  },
  { id: "planning", name: "Planning", href: "/planning" },
  { id: "gallery", name: "Galerie", href: "/galerie" },
  { id: "contact", name: "Contact", href: "/contact" },
];

export const formulesEte = [
  {
    id: "decouverte-ete",
    name: "Découverte",
    duration: "~15 minutes",
    altitude: "800m de dénivelé",
    weightMin: 20,
    weightMax: 100,
    price: 95,
    description: "Parfait pour une première expérience ! Découvrez la magie du vol en parapente avec un vol d'initiation au-dessus de la magnifique vallée du Champsaur.",
    features: [
      "Vol d'environ 15 minutes",
      "Décollage depuis Orcières, St Léger ou Ancelle",
      "Vue panoramique sur le Champsaur",
      "Option vidéo HD disponible"
    ],
    popular: false,
    options: [
      { id: "acrobatie", name: "Acrobatie", price: 10 },
      { id: "pilotage", name: "Pilotage", price: 10 },
      { id: "photo-video", name: "Photo/Vidéo", price: 30 }
    ]
  },
  {
    id: "ascendances",
    name: "Ascendances",
    duration: "~25 minutes",
    altitude: "Thermiques & dynamiques",
    weightMin: 50,
    weightMax: 100,
    price: 130,
    description: "Explorez les ascendances thermiques et dynamiques pour un vol prolongé. Idéal pour ceux qui veulent vraiment profiter de l'expérience.",
    features: [
      "Vol d'environ 25 minutes",
      "Exploitation des thermiques",
      "Sensations de vol authentiques",
      "Option vidéo HD disponible"
    ],
    popular: true,
    options: [
      { id: "acrobatie", name: "Acrobatie", price: 10 },
      { id: "pilotage", name: "Pilotage", price: 10 },
      { id: "photo-video", name: "Photo/Vidéo", price: 30 }
    ]
  },
  {
    id: "balade",
    name: "Balade Aérienne",
    duration: "~45 minutes",
    altitude: "Vol longue durée",
    weightMin: 50,
    weightMax: 90,
    price: 160,
    description: "La formule la plus complète ! Une véritable balade aérienne pour admirer toute la beauté de la vallée du Champsaur.",
    features: [
      "Vol d'environ 45 minutes",
      "Tour complet de la vallée",
      "Expérience immersive",
      "Option vidéo HD disponible"
    ],
    popular: false,
    options: [
      { id: "acrobatie", name: "Acrobatie", price: 10 },
      { id: "pilotage", name: "Pilotage", price: 10 },
      { id: "photo-video", name: "Photo/Vidéo", price: 30 }
    ]
  }
];

export const formulesHiver = [
  {
    id: "decouverte-hiver",
    name: "Découverte Ski",
    duration: "~12 minutes",
    altitude: "700m de dénivelé",
    weightMin: 15,
    weightMax: 100,
    price: 85,
    description: "Vivez l'expérience unique du décollage à ski depuis les pistes d'Orcières Merlette avec possibilité de touch and go ! Atterrissage à la station.",
    features: [
      "Décollage uniquement à ski",
      "Vol d'environ 12 minutes",
      "Touch and go possible",
      "Vue sur les montagnes enneigées",
      "Option vidéo HD disponible"
    ],
    popular: true,
    requirements: ["Savoir descendre une piste bleue facile"],
    options: [
      { id: "photo-video", name: "Photo/Vidéo", price: 30 }
    ]
  },
  {
    id: "promenade-hiver",
    name: "Le Grand Vol",
    duration: "25 minutes",
    altitude: "Vol long",
    weightMin: 50,
    weightMax: 90,
    price: 145,
    description: "La formule complète hiver avec un vol plus long et la possibilité de touch and go ! Prestation d'environ 1h30.",
    features: [
      "Prestation 1h30 au total",
      "Vol de 25 minutes",
      "Décollage uniquement à ski",
      "Touch and go possible",
      "Option vidéo HD disponible"
    ],
    popular: false,
    requirements: ["Savoir descendre une piste bleue facile"],
    options: [
      { id: "photo-video", name: "Photo/Vidéo", price: 30 }
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Marie L.",
    location: "Lyon",
    rating: 5,
    text: "Une expérience incroyable ! Jean-Philippe est très professionnel et rassurant. Le paysage du Champsaur vu du ciel est à couper le souffle.",
    date: "Été 2024",
    formula: "Balade Aérienne"
  },
  {
    id: 2,
    name: "Thomas D.",
    location: "Paris",
    rating: 5,
    text: "Baptême en hiver avec décollage à ski, c'était magique ! Je recommande à 100%.",
    date: "Hiver 2024",
    formula: "Découverte Ski"
  },
  {
    id: 3,
    name: "Sophie M.",
    location: "Marseille",
    rating: 5,
    text: "25 ans d'expérience ça se sent ! On se sent vraiment en sécurité. Merci pour ce moment inoubliable.",
    date: "Été 2024",
    formula: "Ascendances"
  },
  {
    id: 4,
    name: "Pierre B.",
    location: "Gap",
    rating: 5,
    text: "J'ai offert ce baptême à ma fille pour ses 18 ans, elle était aux anges ! Merci Jean-Philippe.",
    date: "Printemps 2024",
    formula: "Découverte"
  }
];

export const blogPosts = [
  {
    id: "saison-2025-2026",
    title: "Saison Hiver 2025/2026",
    slug: "saison-hiver-2025-2026",
    excerpt: "Ouverture de la station d'Orcières Merlette du 13 Décembre 2025 au 12 avril 2026. Réservez dès maintenant votre baptême !",
    date: "2025-12-01",
    category: "Actualités"
  },
  {
    id: "conseils-premier-vol",
    title: "Conseils pour votre premier vol en parapente",
    slug: "conseils-premier-vol",
    excerpt: "Tout ce que vous devez savoir avant votre baptême de parapente : équipement, préparation, et à quoi vous attendre.",
    date: "2024-06-15",
    category: "Conseils"
  }
];
