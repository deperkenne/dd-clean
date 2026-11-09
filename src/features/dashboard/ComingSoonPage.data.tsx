import type { Localized } from '@/lib/i18n'

type ComingSoonContent = {
  area: string
  eyebrow: string
  title: string
  lead: string
  backLabel: string
}

export const comingSoonContent: Localized<ComingSoonContent> = {
  fr: {
    area: 'Espace équipe',
    eyebrow: 'Bientôt disponible',
    title: 'Votre espace arrive bientôt.',
    lead: "L'espace correspondant à votre rôle est en cours de préparation. Vous serez informé dès qu'il sera disponible.",
    backLabel: 'Retour au site',
  },
  de: {
    area: 'Teambereich',
    eyebrow: 'Demnächst verfügbar',
    title: 'Ihr Bereich ist bald verfügbar.',
    lead: 'Der Bereich für Ihre Rolle wird gerade vorbereitet. Wir informieren Sie, sobald er bereit ist.',
    backLabel: 'Zurück zur Website',
  },
  en: {
    area: 'Team area',
    eyebrow: 'Coming soon',
    title: 'Your area is coming soon.',
    lead: "The area for your role is being prepared. We'll let you know as soon as it's ready.",
    backLabel: 'Back to the website',
  },
}
