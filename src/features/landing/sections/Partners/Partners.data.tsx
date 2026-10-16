import type { Localized } from '@/lib/i18n'

type Partner = {
  id: string
  name: string
  logo: string
}

// TODO: partenaires fictifs (noms et logos de démonstration), à remplacer par les vrais
// partenaires avant la mise en ligne. Déposer les logos dans public/images/partners/.
export const partners: Partner[] = [
  { id: 'steinlot', name: 'Steinlot Baustoffe', logo: '/images/partners/steinlot.svg' },
  { id: 'hausklar', name: 'Hausklar Hausverwaltung', logo: '/images/partners/hausklar.svg' },
  { id: 'malerwerk-rotach', name: 'Malerwerk Rotach', logo: '/images/partners/malerwerk-rotach.svg' },
  { id: 'quartier-9', name: 'Quartier 9 Apartments', logo: '/images/partners/quartier-9.svg' },
  { id: 'novabau', name: 'Novabau Franken', logo: '/images/partners/novabau.svg' },
  { id: 'kellermann', name: 'Kellermann Facility Services', logo: '/images/partners/kellermann.svg' },
]

type PartnersContent = {
  eyebrow: string
  title: string
  description: string
}

export const partnersContent: Localized<PartnersContent> = {
  fr: {
    eyebrow: 'Partenaires',
    title: 'Nos partenaires en Franconie.',
    description:
      'Négoces, artisans du bâtiment et gestionnaires de biens avec qui nous intervenons au quotidien.',
  },
  de: {
    eyebrow: 'Partner',
    title: 'Unsere Partner in Franken.',
    description:
      'Baustoffhändler, Handwerksbetriebe und Hausverwaltungen, mit denen wir täglich zusammenarbeiten.',
  },
  en: {
    eyebrow: 'Partners',
    title: 'Our partners in Franconia.',
    description:
      'Building suppliers, trades and property managers we work with every day.',
  },
}
