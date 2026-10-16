import type { Localized } from '@/lib/i18n'

type FooterContent = {
  homeLabel: string
  tagline: string
  availability: string
  contactTitle: string
  areasTitle: string
  legalTitle: string
  legalLinks: { label: string; href: string }[]
  rights: string
}

const year = new Date().getFullYear()

export const footerContent: Localized<FooterContent> = {
  fr: {
    homeLabel: 'D&D Clean — accueil',
    tagline: 'Nettoyage professionnel à Nürnberg pour particuliers et professionnels.',
    availability: 'Disponible 7j/7',
    contactTitle: 'Coordonnées',
    areasTitle: "Zone d'intervention",
    legalTitle: 'Informations légales',
    legalLinks: [
      { label: 'Mentions légales (Impressum)', href: '/impressum' },
      { label: 'Confidentialité (Datenschutz)', href: '/datenschutz' },
    ],
    rights: `© ${year} D&D Clean. Tous droits réservés.`,
  },
  de: {
    homeLabel: 'D&D Clean — Startseite',
    tagline: 'Professionelle Reinigung in Nürnberg für Privat- und Geschäftskunden.',
    availability: '7 Tage die Woche erreichbar',
    contactTitle: 'Kontakt',
    areasTitle: 'Einsatzgebiet',
    legalTitle: 'Rechtliches',
    legalLinks: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutzerklärung', href: '/datenschutz' },
    ],
    rights: `© ${year} D&D Clean. Alle Rechte vorbehalten.`,
  },
  en: {
    homeLabel: 'D&D Clean — home',
    tagline: 'Professional cleaning in Nuremberg for private and business clients.',
    availability: 'Available 7 days a week',
    contactTitle: 'Contact details',
    areasTitle: 'Service area',
    legalTitle: 'Legal',
    legalLinks: [
      { label: 'Legal notice (Impressum)', href: '/impressum' },
      { label: 'Privacy policy (Datenschutz)', href: '/datenschutz' },
    ],
    rights: `© ${year} D&D Clean. All rights reserved.`,
  },
}
