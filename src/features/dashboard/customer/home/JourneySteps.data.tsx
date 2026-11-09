import type { Localized } from '@/lib/i18n'
import type { JourneyStepTone } from './JourneyStep'

type JourneyStepContent = {
  title: string
  description: string
  tag: string
  tone: JourneyStepTone
}

type JourneyStepsContent = {
  eyebrow: string
  title: string
  lead: string
  steps: JourneyStepContent[]
}

export const journeyStepsContent: Localized<JourneyStepsContent> = {
  fr: {
    eyebrow: 'Votre parcours',
    title: 'Trois saisies, puis tout s’enchaîne.',
    lead: 'Chaque étape s’appuie sur la précédente : un propriétaire possède des logements, chaque logement ses chambres.',
    steps: [
      {
        title: 'Le propriétaire',
        description: 'Son nom et ses coordonnées ; le numéro client est attribué automatiquement.',
        tag: 'Vous',
        tone: 'manual',
      },
      {
        title: 'Ses logements',
        description: 'Adresse et nom exact du logement tel qu’il apparaît dans les e-mails Smoobu.',
        tag: 'Vous',
        tone: 'manual',
      },
      {
        title: 'Les chambres',
        description: 'Numéro ou code de chaque chambre, avec le prix de son ménage.',
        tag: 'Vous',
        tone: 'manual',
      },
      {
        title: 'Réservations et factures',
        description: 'Les réservations Smoobu sont rattachées au bon logement, puis facturées chaque mois au propriétaire.',
        tag: 'Automatique',
        tone: 'automatic',
      },
    ],
  },
  de: {
    eyebrow: 'Ihr Ablauf',
    title: 'Drei Eingaben, dann läuft alles von selbst.',
    lead: 'Jeder Schritt baut auf dem vorherigen auf: Ein Eigentümer hat Unterkünfte, jede Unterkunft ihre Zimmer.',
    steps: [
      {
        title: 'Der Eigentümer',
        description: 'Name und Kontaktdaten; die Kundennummer wird automatisch vergeben.',
        tag: 'Sie',
        tone: 'manual',
      },
      {
        title: 'Seine Unterkünfte',
        description: 'Adresse und genauer Name der Unterkunft, wie er in den Smoobu-E-Mails steht.',
        tag: 'Sie',
        tone: 'manual',
      },
      {
        title: 'Die Zimmer',
        description: 'Nummer oder Code jedes Zimmers, mit dem Preis seiner Reinigung.',
        tag: 'Sie',
        tone: 'manual',
      },
      {
        title: 'Buchungen und Rechnungen',
        description: 'Smoobu-Buchungen werden der richtigen Unterkunft zugeordnet und monatlich dem Eigentümer berechnet.',
        tag: 'Automatisch',
        tone: 'automatic',
      },
    ],
  },
  en: {
    eyebrow: 'Your journey',
    title: 'Three entries, then everything follows.',
    lead: 'Each step builds on the previous one: an owner has properties, each property its rooms.',
    steps: [
      {
        title: 'The owner',
        description: 'Name and contact details; the customer number is assigned automatically.',
        tag: 'You',
        tone: 'manual',
      },
      {
        title: 'Their properties',
        description: 'Address and the exact property name as it appears in Smoobu e-mails.',
        tag: 'You',
        tone: 'manual',
      },
      {
        title: 'The rooms',
        description: 'Number or code of each room, with its cleaning price.',
        tag: 'You',
        tone: 'manual',
      },
      {
        title: 'Bookings and invoices',
        description: 'Smoobu bookings are linked to the right property, then invoiced monthly to the owner.',
        tag: 'Automatic',
        tone: 'automatic',
      },
    ],
  },
}
