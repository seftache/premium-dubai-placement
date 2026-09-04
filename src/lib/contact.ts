/**
 * Configuration de contact centralisée pour le site vitrine Emplois Dubaï.
 * Aucune coordonnée personnelle n'est exposée.
 * Le formulaire de contact transmet les candidatures par email via Web3Forms (sans backend ni base de données).
 */

export const CONTACT_CONFIG = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Emplois Dubaï",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@emploisdubai.com",
  
  // Mentions d'attente pour le futur locataire / repreneur du site
  agencyPhonePlaceholder: "Numéro de la nouvelle agence : En attente du repreneur",
  agencyPhoneNotice: "Coordonnées en cours d'attribution pour le futur locataire du site",
  
  // Clé d'accès gratuite Web3Forms (à définir dans .env.local ou sur Vercel)
  web3FormsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",

  // Aucun numéro WhatsApp personnel
  phone: "",
  whatsappNumber: "",
  whatsappUrl: "",
};
