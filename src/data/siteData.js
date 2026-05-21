// ============================================================
// DONNÉES DU SITE — La Table d'Awa
// Remplacer par une vraie API plus tard sans changer la structure
// ============================================================

export const SITE_CONFIG = {
  name: "Lino's Food",
  tagline: "Saveurs authentiques, moments inoubliables",
  description: "Une cuisine généreuse qui marie tradition locale et créativité moderne. Des plats faits maison, des produits frais, une hospitalité sincère.",
  phone: "+229 01 66 45 13 42",
  email: "maximaineh@gmail.com",
  address: "Dégakon, En face de l'école Stella matutina, Cotonou,Bénin",
  hours: {
    weekdays: "08h00 – 23h30",
    weekends: "10h00 – 23h30",
    closed: "Fermé le dimanche",
  },
  social: { instagram: "#", facebook: "#", whatsapp: "+22966451342" },
};

export const NAV_LINKS = [
  { label: "Accueil",    href: "#hero" },
  { label: "Notre Carte", href: "#menu" },
  { label: "Services",   href: "#services" },
  { label: "Événements", href: "#evenements" },
  { label: "À propos",   href: "#about" },
  { label: "Contact",    href: "#contact" },
];

export const MENU_CATEGORIES = [
  { id: "all",      label: "Tout voir",           icon: "🍽️" },
  { id: "starters", label: "Entrées",             icon: "🥗" },
  { id: "mains",    label: "Plats principaux",    icon: "🍲" },
  { id: "local",    label: "Spécialités locales", icon: "🌿" },
  { id: "grilled",  label: "Grillades",           icon: "🔥" },
  { id: "desserts", label: "Desserts",            icon: "🍮" },
  { id: "drinks",   label: "Boissons",            icon: "🥤" },
];

export const MENU_ITEMS = [
  {
    id: "m1", name: "Accras de haricots",
    description: "Beignets croustillants de haricots niébé, relevés d'épices locales. Sauce tomate pimentée maison.",
    price: 2500, category: "starters", tags: ["végétarien", "local"], isPopular: true,
  },
  {
    id: "m2", name: "Salade tropicale",
    description: "Avocat, mangue verte, papaye, tomates cerises, vinaigrette citron vert et gingembre.",
    price: 3500, category: "starters", tags: ["végétarien", "frais"], isNew: true,
  },
  {
    id: "m3", name: "Brochettes de crevettes",
    description: "Crevettes géantes marinées ail, citronnelle et piment doux. Sur lit de salade fraîche.",
    price: 4500, category: "starters", tags: ["fruits de mer"],
  },
  {
    id: "m4", name: "Poulet DG",
    description: "Poulet fermier sauté aux plantains mûrs, légumes et épices. L'incontournable de la maison.",
    price: 8500, category: "mains", tags: ["signature", "local"], isPopular: true,
  },
  {
    id: "m5", name: "Poisson braisé",
    description: "Tilapia entier mariné aux herbes fraîches, citron et ail. Riz à la tomate maison.",
    price: 9000, category: "mains", tags: ["poisson", "local"],
  },
  {
    id: "m6", name: "Riz gras au poulet",
    description: "Riz cuisiné lentement dans un bouillon riche de tomates et épices. Salade et plantain.",
    price: 6500, category: "mains", tags: ["local", "complet"],
  },
  {
    id: "m7", name: "Amiwo spécial",
    description: "Plat béninois traditionnel à base de farine de maïs fermentée et sauce de graine de palme.",
    price: 5000, category: "local", tags: ["traditionnel", "végétarien"], isPopular: true,
  },
  {
    id: "m8", name: "Gboma Dessi",
    description: "Sauce épinards africains, bœuf et crevettes séchées. Servi avec eba ou riz blanc.",
    price: 7000, category: "local", tags: ["traditionnel", "signature"],
  },
  {
    id: "m9", name: "Fufu & Sauce Arachide",
    description: "Fufu de manioc moelleux, généreuse sauce arachide au poulet et épices locales.",
    price: 6000, category: "local", tags: ["traditionnel"],
  },
  {
    id: "m10", name: "Côtes de porc grillées",
    description: "Côtes marinées 24h dans une rub d'épices africaines. Cuisson au charbon, sauce BBQ pimentée.",
    price: 11000, category: "grilled", tags: ["grillade", "signature"], isNew: true,
  },
  {
    id: "m11", name: "Mixed Grill",
    description: "Assortiment poulet, bœuf, agneau grillés. Légumes grillés, frites et sauces maison.",
    price: 14500, category: "grilled", tags: ["grillade", "partage"], isPopular: true,
  },
  {
    id: "m12", name: "Beignets miel & gingembre",
    description: "Beignets dorés maison, miel local, zestes d'orange et gingembre frais.",
    price: 2500, category: "desserts", tags: ["sucré", "traditionnel"],
  },
  {
    id: "m13", name: "Crème coco caramel",
    description: "Crème onctueuse à la noix de coco fraîche, caramel doré maison et coco grillée.",
    price: 3000, category: "desserts", tags: ["sucré", "local"], isPopular: true,
  },
  {
    id: "m14", name: "Bissap frais",
    description: "Jus d'hibiscus maison légèrement sucré à la canne, menthe et gingembre. Servi glacé.",
    price: 1500, category: "drinks", tags: ["naturel", "local"], isPopular: true,
  },
  {
    id: "m15", name: "Gingembre citronné",
    description: "Infusion froide de gingembre frais, citron vert et miel de fleurs. Tonique et désaltérant.",
    price: 1500, category: "drinks", tags: ["naturel", "santé"],
  },
  {
    id: "m16", name: "Baobab Sunrise",
    description: "Jus de baobab, orange, sirop de bissap. Sans alcool ou avec un trait de rhum blanc.",
    price: 2500, category: "drinks", tags: ["signature", "cocktail"], isNew: true,
  },
];

export const SERVICES = [
  {
    id: "s1", icon: "🍽️",
    title: "Restauration sur place",
    description: "Un cadre chaleureux pour vos repas du midi et du soir. Tables intérieures et bien aérées.",
    features: ["Service midi & soir", "Terrasse ombragée", "Wi-Fi gratuit", "Climatisation"],
    cta: "Réserver une table", ctaHref: "#reservation",
  },
  {
    id: "s2", icon: "🚚",
    title: "Livraison à domicile",
    description: "Vos plats favoris livrés chauds à votre porte dans un rayon de 10 km autour de Cotonou.",
    features: ["Livraison ~30 min", "Emballages éco", "Mobile Money", "Commande en ligne"],
    cta: "Commander", ctaHref: "#livraison",
  },
  {
    id: "s3", icon: "🎉",
    title: "Catering & Événements",
    description: "Mariages, anniversaires, séminaires et réceptions privées avec service traiteur complet.",
    features: ["Devis gratuit", "Menu sur mesure", "Personnel inclus", "Décoration optionnelle"],
    cta: "Demander un devis", ctaHref: "#evenements",
  },
  {
    id: "s4", icon: "🛒",
    title: "Plats à emporter",
    description: "Commandez à l'avance, récupérez chaud. Idéal pour les pauses déjeuner et les soirées.",
    features: ["Commande anticipée", "Retrait rapide", "Portions familiales", "Plats du jour"],
    cta: "Voir la carte", ctaHref: "#menu",
  },
];

export const EVENTS = [
  {
    id: "e1",
    title: "Soirée Saveurs du Bénin",
    description: "Un voyage culinaire à travers les spécialités authentiques du Bénin. Musique live et dégustation.",
    date: "12 juillet 2025", time: "19h00 – 23h00",
    type: "Soirée gastronomique", price: 15000, badge: "À venir",
  },
  {
    id: "e2",
    title: "Brunch Dominical",
    description: "Chaque dimanche, un brunch généreux alliant recettes locales et inspirations internationales.",
    date: "Tous les dimanches", time: "10h00 – 14h00",
    type: "Brunch hebdomadaire", price: 8500, badge: "Régulier",
  },
  {
    id: "e3",
    title: "Atelier Cuisine Locale",
    description: "Apprenez à préparer 3 plats béninois avec notre chef. Tablier, recettes et dégustation inclus.",
    date: "26 juillet 2025", time: "10h00 – 13h00",
    type: "Atelier participatif", price: 12000, badge: "Places limitées",
  },
];

export const TESTIMONIALS = [
  {
    id: "t1", name: "Aminata K.", role: "Cliente fidèle", rating: 5,
    text: "Le meilleur poulet DG de Cotonou, sans hésitation. Saveurs authentiques, service chaleureux. Je reviens chaque semaine !",
  },
  {
    id: "t2", name: "Pierre-Emmanuel D.", role: "Chef d'entreprise", rating: 5,
    text: "Catering pour notre séminaire d'entreprise. Ponctualité, qualité des plats, présentation soignée. Parfait de A à Z.",
  },
  {
    id: "t3", name: "Fatoumata B.", role: "Blogueuse food", rating: 5,
    text: "Un vrai coup de cœur. La cuisine traditionnelle revisitée avec modernité. Le gboma dessi m'a rappelé les repas de ma grand-mère.",
  },
  {
    id: "t4", name: "Marc & Julie", role: "Mariage — 120 invités", rating: 5,
    text: "Notre mariage était parfait grâce à leur équipe. Menu personnalisé, buffets magnifiques, équipe réactive. Au-delà des attentes.",
  },
];

export const STATS = [
  { value: "8+",   label: "Années d'expérience" },
  { value: "30+", label: "Événements organisés" },
  { value: "50+",  label: "Plats à la carte" },
  { value: "4.9",  label: "Note moyenne" },
];

// ── HELPERS ──────────────────────────────────────────────────
export const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR").format(price) + " FCFA";