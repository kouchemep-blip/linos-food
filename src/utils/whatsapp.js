export const CHEF_WHATSAPP_NUMBER = "22966451342";

export function whatsappLink(message) {
  return `https://wa.me/${CHEF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  reservation:
    "Bonjour, je souhaite reserver une table chez Lino's Food. Pourriez-vous me confirmer les disponibilites, s'il vous plait ?",
  order:
    "Bonjour, je souhaite passer une commande chez Lino's Food. Pouvez-vous m'indiquer les plats disponibles et la marche a suivre ?",
  quote:
    "Bonjour, je souhaite obtenir un devis pour un service traiteur avec Lino's Food. Pouvez-vous me renseigner ?",
  menu:
    "Bonjour, je consulte la carte de Lino's Food et j'aimerais avoir quelques recommandations sur les plats.",
  eventContact:
    "Bonjour, je souhaite organiser un evenement avec Lino's Food. Pouvez-vous me donner les informations pour un accompagnement personnalise ?",
  cateringQuote:
    "Bonjour, je souhaite demander un devis gratuit pour le service traiteur de Lino's Food. Voici les details de mon besoin :",
  navbarReservation:
    "Bonjour, je souhaite reserver une table chez Lino's Food. Pouvez-vous me confirmer les horaires disponibles ?",
};
