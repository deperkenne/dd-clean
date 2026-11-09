import type { Localized } from '@/lib/i18n'

type WelcomeHeroContent = {
  eyebrow: string
  greeting: string
  lead: string
  cta: string
  reservationsCta: string
  cardTitle: string
  holderLabel: string
  contactLabel: string
  accessLabel: string
  accessValue: string
}

export const welcomeHeroContent: Localized<WelcomeHeroContent> = {
  fr: {
    eyebrow: 'Dossier client',
    greeting: 'Bonjour',
    lead: 'Déclarez vos propriétaires, leurs logements et leurs chambres : D&D Clean s’occupe du reste, de la réservation jusqu’à la facture.',
    cta: 'Créer un propriétaire',
    reservationsCta: 'Voir mes réservations',
    cardTitle: 'Votre compte',
    holderLabel: 'Titulaire',
    contactLabel: 'Contact',
    accessLabel: 'Accès',
    accessValue: 'Connexion sécurisée',
  },
  de: {
    eyebrow: 'Kundenakte',
    greeting: 'Guten Tag',
    lead: 'Erfassen Sie Ihre Eigentümer, deren Unterkünfte und Zimmer – D&D Clean kümmert sich um den Rest, von der Buchung bis zur Rechnung.',
    cta: 'Eigentümer anlegen',
    reservationsCta: 'Meine Buchungen ansehen',
    cardTitle: 'Ihr Konto',
    holderLabel: 'Inhaber',
    contactLabel: 'Kontakt',
    accessLabel: 'Zugang',
    accessValue: 'Sichere Anmeldung',
  },
  en: {
    eyebrow: 'Customer file',
    greeting: 'Hello',
    lead: 'Add your owners, their properties and their rooms – D&D Clean takes care of the rest, from booking to invoice.',
    cta: 'Create an owner',
    reservationsCta: 'View my bookings',
    cardTitle: 'Your account',
    holderLabel: 'Account holder',
    contactLabel: 'Contact',
    accessLabel: 'Access',
    accessValue: 'Secure sign-in',
  },
}
