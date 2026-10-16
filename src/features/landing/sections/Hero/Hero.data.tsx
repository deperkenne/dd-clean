import type { Localized } from '@/lib/i18n'

type HeroContent = {
  eyebrow: string
  title: string
  titleAccent: string
  lead: string
  primaryCta: { label: string; href: string }
  whatsappCta: string
  checklist: {
    title: string
    items: string[]
  }
}

/** Image de fond du Hero, identique pour les trois langues (décorative, sans texte alternatif). */
// TODO: photo Unsplash provisoire, à remplacer par une photo D&D Clean.
export const heroBackground = {
  src: '/images/hero-living-room.webp',
}

export const heroContent: Localized<HeroContent> = {
  fr: {
    eyebrow: 'Nettoyage professionnel · Nürnberg & région',
    title: 'Impeccable.',
    titleAccent: 'À chaque passage.',
    lead: 'Locations Airbnb, hôtels, bureaux, fins de chantier, voitures et canapés. Une seule équipe, 7j/7, pour les particuliers comme pour les professionnels.',
    primaryCta: { label: 'Demander un devis', href: '#contact' },
    whatsappCta: 'Écrire sur WhatsApp',
    checklist: {
      title: 'Rotation Airbnb — check-list',
      items: [
        'Linge changé, lits faits',
        'Cuisine et salle de bain désinfectées',
        'Sols aspirés et lavés',
        "Contrôle final avant l'arrivée",
      ],
    },
  },
  de: {
    eyebrow: 'Professionelle Reinigung · Nürnberg & Umgebung',
    title: 'Makellos.',
    titleAccent: 'Bei jedem Einsatz.',
    lead: 'Airbnb-Wohnungen, Hotels, Büros, Baureinigung, Autos und Sofas. Ein Team, 7 Tage die Woche – für Privat- und Geschäftskunden.',
    primaryCta: { label: 'Angebot anfordern', href: '#contact' },
    whatsappCta: 'Per WhatsApp schreiben',
    checklist: {
      title: 'Airbnb-Wechsel — Checkliste',
      items: [
        'Bettwäsche gewechselt, Betten gemacht',
        'Küche und Bad desinfiziert',
        'Böden gesaugt und gewischt',
        'Endkontrolle vor Gästeankunft',
      ],
    },
  },
  en: {
    eyebrow: 'Professional cleaning · Nuremberg & region',
    title: 'Spotless.',
    titleAccent: 'Every single visit.',
    lead: 'Airbnb rentals, hotels, offices, post-construction, cars and sofas. One team, 7 days a week, for private and business clients.',
    primaryCta: { label: 'Get a quote', href: '#contact' },
    whatsappCta: 'Message us on WhatsApp',
    checklist: {
      title: 'Airbnb turnover — checklist',
      items: [
        'Linen changed, beds made',
        'Kitchen and bathroom disinfected',
        'Floors vacuumed and mopped',
        'Final check before guests arrive',
      ],
    },
  },
}
