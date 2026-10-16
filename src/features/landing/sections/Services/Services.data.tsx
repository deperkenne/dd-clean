import type { Localized } from '@/lib/i18n'

export type Audience = 'private' | 'business'

type ServiceId = 'airbnb' | 'hotels' | 'offices' | 'construction' | 'cars' | 'sofas'

type ServiceDefinition = {
  id: ServiceId
  image: string
  audiences: Audience[]
}

/** Données communes aux trois langues (ordre d'affichage, photo, cibles). */
// TODO: photos Unsplash provisoires, à remplacer par des photos D&D Clean.
export const serviceDefinitions: ServiceDefinition[] = [
  { id: 'airbnb', image: '/images/services/airbnb.webp', audiences: ['business', 'private'] },
  { id: 'hotels', image: '/images/services/hotels.webp', audiences: ['business'] },
  { id: 'offices', image: '/images/services/offices.webp', audiences: ['business'] },
  { id: 'construction', image: '/images/services/construction.webp', audiences: ['business', 'private'] },
  { id: 'cars', image: '/images/services/cars.webp', audiences: ['private', 'business'] },
  { id: 'sofas', image: '/images/services/sofas.webp', audiences: ['private', 'business'] },
]

type ServicesContent = {
  eyebrow: string
  title: string
  description: string
  audienceLabels: Record<Audience, string>
  services: Record<ServiceId, { name: string; description: string; imageAlt: string }>
}

export const servicesContent: Localized<ServicesContent> = {
  fr: {
    eyebrow: 'Services',
    title: "Six métiers, un même niveau d'exigence.",
    description:
      'Du studio Airbnb au plateau de bureaux, chaque intervention suit une méthode précise et vérifiée.',
    audienceLabels: { private: 'Particuliers', business: 'Pros' },
    services: {
      airbnb: {
        imageAlt: "Salon lumineux d'un appartement meublé",
        name: 'Airbnb & locations courtes',
        description:
          'Rotation complète entre deux séjours : linge, cuisine, salle de bain, sols et contrôle final.',
      },
      hotels: {
        imageAlt: "Chambre d'hôtel au lit fait",
        name: 'Hôtels',
        description: 'Chambres et parties communes, en renfort ponctuel ou en continu.',
      },
      offices: {
        imageAlt: 'Plateau de bureaux ouvert et lumineux',
        name: 'Bureaux',
        description: "Espaces de travail, sanitaires et cuisines propres avant l'arrivée des équipes.",
      },
      construction: {
        imageAlt: 'Ouvriers sur un chantier de construction',
        name: 'Fin de chantier',
        description: 'Poussière, traces de peinture et de plâtre, vitres : des lieux prêts à être livrés.',
      },
      cars: {
        imageAlt: "Lavage à la main d'une voiture noire",
        name: 'Voitures',
        description: 'Nettoyage intérieur et extérieur : sièges, tapis, plastiques et vitres.',
      },
      sofas: {
        imageAlt: 'Canapé en velours vert',
        name: 'Canapés',
        description: 'Nettoyage en profondeur et détachage des canapés, fauteuils et assises.',
      },
    },
  },
  de: {
    eyebrow: 'Leistungen',
    title: 'Sechs Bereiche, ein Anspruch.',
    description:
      'Vom Airbnb-Apartment bis zur Bürofläche: Jeder Einsatz folgt einer klaren, geprüften Methode.',
    audienceLabels: { private: 'Privat', business: 'Gewerbe' },
    services: {
      airbnb: {
        imageAlt: 'Helles Wohnzimmer einer möblierten Wohnung',
        name: 'Airbnb & Ferienwohnungen',
        description:
          'Kompletter Wechsel zwischen zwei Aufenthalten: Wäsche, Küche, Bad, Böden und Endkontrolle.',
      },
      hotels: {
        imageAlt: 'Hotelzimmer mit gemachtem Bett',
        name: 'Hotels',
        description: 'Zimmer und Gemeinschaftsbereiche – als Verstärkung oder dauerhaft.',
      },
      offices: {
        imageAlt: 'Offene, helle Bürofläche',
        name: 'Büros',
        description: 'Arbeitsplätze, Sanitär- und Küchenbereiche sauber, bevor Ihr Team kommt.',
      },
      construction: {
        imageAlt: 'Arbeiter auf einer Baustelle',
        name: 'Baureinigung',
        description: 'Staub, Farb- und Gipsreste, Fenster: Räume bereit zur Übergabe.',
      },
      cars: {
        imageAlt: 'Handwäsche eines schwarzen Autos',
        name: 'Autos',
        description: 'Innen- und Außenreinigung: Sitze, Fußmatten, Kunststoffe und Scheiben.',
      },
      sofas: {
        imageAlt: 'Grünes Samtsofa',
        name: 'Sofas',
        description: 'Tiefenreinigung und Fleckentfernung für Sofas, Sessel und Polster.',
      },
    },
  },
  en: {
    eyebrow: 'Services',
    title: 'Six trades, one standard.',
    description:
      'From an Airbnb studio to a full office floor, every job follows a precise, checked method.',
    audienceLabels: { private: 'Private', business: 'Business' },
    services: {
      airbnb: {
        imageAlt: 'Bright living room in a furnished apartment',
        name: 'Airbnb & short-term rentals',
        description:
          'Full turnover between stays: linen, kitchen, bathroom, floors and a final check.',
      },
      hotels: {
        imageAlt: 'Hotel room with a made bed',
        name: 'Hotels',
        description: 'Rooms and common areas, as extra support or on an ongoing basis.',
      },
      offices: {
        imageAlt: 'Bright open-plan office floor',
        name: 'Offices',
        description: 'Workspaces, restrooms and kitchens clean before your team arrives.',
      },
      construction: {
        imageAlt: 'Workers on a construction site',
        name: 'Post-construction',
        description: 'Dust, paint and plaster residue, windows: spaces ready for handover.',
      },
      cars: {
        imageAlt: 'Hand-washing a black car',
        name: 'Cars',
        description: 'Interior and exterior cleaning: seats, mats, trim and windows.',
      },
      sofas: {
        imageAlt: 'Green velvet sofa',
        name: 'Sofas',
        description: 'Deep cleaning and stain removal for sofas, armchairs and upholstery.',
      },
    },
  },
}
