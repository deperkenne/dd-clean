import type { Localized } from '@/lib/i18n'

export type NavLink = {
  label: string
  href: string
}

type HeaderContent = {
  homeLabel: string
  navLabel: string
  links: NavLink[]
  quoteCta: NavLink
  whatsappLabel: string
  languageLabel: string
  openMenuLabel: string
  closeMenuLabel: string
  menuTitle: string
}

export const headerContent: Localized<HeaderContent> = {
  fr: {
    homeLabel: 'D&D Clean — accueil',
    navLabel: 'Navigation principale',
    links: [
      { label: 'Services', href: '/#services' },
      { label: 'Pourquoi nous', href: '/#pourquoi' },
      { label: 'Contact', href: '/#contact' },
    ],
    quoteCta: { label: 'Demander un devis', href: '/#contact' },
    whatsappLabel: 'Écrire sur WhatsApp',
    languageLabel: 'Choisir la langue',
    openMenuLabel: 'Ouvrir le menu',
    closeMenuLabel: 'Fermer le menu',
    menuTitle: 'Menu',
  },
  de: {
    homeLabel: 'D&D Clean — Startseite',
    navLabel: 'Hauptnavigation',
    links: [
      { label: 'Leistungen', href: '/#services' },
      { label: 'Warum wir', href: '/#pourquoi' },
      { label: 'Kontakt', href: '/#contact' },
    ],
    quoteCta: { label: 'Angebot anfordern', href: '/#contact' },
    whatsappLabel: 'Per WhatsApp schreiben',
    languageLabel: 'Sprache wählen',
    openMenuLabel: 'Menü öffnen',
    closeMenuLabel: 'Menü schließen',
    menuTitle: 'Menü',
  },
  en: {
    homeLabel: 'D&D Clean — home',
    navLabel: 'Main navigation',
    links: [
      { label: 'Services', href: '/#services' },
      { label: 'Why us', href: '/#pourquoi' },
      { label: 'Contact', href: '/#contact' },
    ],
    quoteCta: { label: 'Get a quote', href: '/#contact' },
    whatsappLabel: 'Message us on WhatsApp',
    languageLabel: 'Choose language',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    menuTitle: 'Menu',
  },
}
