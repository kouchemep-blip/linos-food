export const CHEF_WHATSAPP_NUMBER = "22966451342";

export function whatsappLink(message) {
  return `https://wa.me/${CHEF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  reservation:
    "Bonjour Cheffe, je viens du site Lino's Food et je souhaite reserver une table. Pouvez-vous me confirmer les disponibilites ?",
  order:
    "Bonjour Cheffe, je viens du site Lino's Food et je souhaite commander un plat. Pouvez-vous me guider pour passer ma commande ?",
  quote:
    "Bonjour Cheffe, je viens du site Lino's Food et je souhaite demander un devis pour un service traiteur ou un evenement.",
  menu:
    "Bonjour Cheffe, je viens du site Lino's Food. J'ai clique sur Voir la carte et je souhaite avoir des recommandations ou plus d'informations sur les plats.",
  eventContact:
    "Bonjour Cheffe, je viens du site Lino's Food. J'ai clique sur Nous contacter dans la section evenement a organiser et je souhaite organiser un evenement.",
  cateringQuote:
    "Bonjour Cheffe, je viens du site Lino's Food. J'ai clique sur Demander un devis gratuit dans la section service traiteur et je souhaite un devis personnalise.",
  navbarReservation:
    "Bonjour Cheffe, je viens du site Lino's Food. J'ai clique sur le bouton Reserver dans la navbar et je souhaite reserver une table.",
};
