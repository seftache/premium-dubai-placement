const DEFAULT_NUMBER = "2250506283668";
const DEFAULT_PHONE_FORMATTED = "+225 05 06 28 36 68";
const DEFAULT_TEXT = "Bonjour, je souhaite des informations sur les opportunités à Dubaï.";

export const CONTACT_CONFIG = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || DEFAULT_PHONE_FORMATTED,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Emplois Dubaï",
  defaultMessage: DEFAULT_TEXT,
  get directWhatsAppUrl() {
    const cleanNumber = (this.whatsappNumber || DEFAULT_NUMBER).replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
  },
  get whatsappUrl() {
    return this.directWhatsAppUrl;
  }
};
