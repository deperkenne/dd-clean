import { CalendarCheckIcon, MapPinIcon, ShieldCheckIcon, TimerIcon, type LucideIcon } from 'lucide-react'
import type { Localized } from '@/lib/i18n'

type ReasonId = 'reliability' | 'responsiveness' | 'availability' | 'areas'

export const reasonIcons: Record<ReasonId, LucideIcon> = {
  reliability: ShieldCheckIcon,
  responsiveness: TimerIcon,
  availability: CalendarCheckIcon,
  areas: MapPinIcon,
}

export const reasonOrder: ReasonId[] = ['reliability', 'responsiveness', 'availability', 'areas']

type WhyUsContent = {
  eyebrow: string
  title: string
  description: string
  reasons: Record<ReasonId, { title: string; description: string }>
  areasLabel: string
}

export const whyUsContent: Localized<WhyUsContent> = {
  fr: {
    eyebrow: 'Pourquoi D&D Clean',
    title: 'Le genre de prestataire à qui on confie ses clés.',
    description:
      "Propriétaires, hôteliers, gérants de bureaux : vous avez besoin d'un résultat constant, pas de promesses.",
    reasons: {
      reliability: {
        title: 'Fiabilité',
        description: 'Une check-list par type de prestation, appliquée à chaque passage, sans exception.',
      },
      responsiveness: {
        title: 'Réactivité',
        description: 'Une réponse rapide à votre demande et des créneaux adaptés à vos contraintes.',
      },
      availability: {
        title: 'Disponible 7j/7',
        description: 'Week-ends et jours fériés compris — idéal pour les rotations Airbnb et les hôtels.',
      },
      areas: {
        title: "Zones d'intervention",
        description: 'Nürnberg et ses environs :',
      },
    },
    areasLabel: 'Villes desservies',
  },
  de: {
    eyebrow: 'Warum D&D Clean',
    title: 'Ein Dienstleister, dem man die Schlüssel anvertraut.',
    description:
      'Vermieter, Hoteliers, Büroverantwortliche: Sie brauchen verlässliche Ergebnisse, keine Versprechen.',
    reasons: {
      reliability: {
        title: 'Zuverlässigkeit',
        description: 'Eine Checkliste pro Leistung – bei jedem Einsatz, ohne Ausnahme.',
      },
      responsiveness: {
        title: 'Schnelle Reaktion',
        description: 'Zügige Antwort auf Ihre Anfrage und Termine, die zu Ihrem Ablauf passen.',
      },
      availability: {
        title: '7 Tage die Woche',
        description: 'Auch am Wochenende und an Feiertagen – ideal für Airbnb-Wechsel und Hotels.',
      },
      areas: {
        title: 'Einsatzgebiet',
        description: 'Nürnberg und Umgebung:',
      },
    },
    areasLabel: 'Bediente Orte',
  },
  en: {
    eyebrow: 'Why D&D Clean',
    title: 'The kind of team you trust with your keys.',
    description:
      'Hosts, hoteliers, office managers: you need consistent results, not promises.',
    reasons: {
      reliability: {
        title: 'Reliability',
        description: 'One checklist per service, applied on every visit, no exceptions.',
      },
      responsiveness: {
        title: 'Responsiveness',
        description: 'A fast reply to your request and time slots that fit your schedule.',
      },
      availability: {
        title: '7 days a week',
        description: 'Weekends and public holidays included — ideal for Airbnb turnovers and hotels.',
      },
      areas: {
        title: 'Service area',
        description: 'Nuremberg and surroundings:',
      },
    },
    areasLabel: 'Areas served',
  },
}
