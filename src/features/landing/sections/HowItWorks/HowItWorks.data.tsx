import type { Localized } from '@/lib/i18n'

type Step = { title: string; description: string }

type HowItWorksContent = {
  eyebrow: string
  title: string
  steps: Step[]
}

export const howItWorksContent: Localized<HowItWorksContent> = {
  fr: {
    eyebrow: 'Fonctionnement',
    title: 'Quatre étapes, zéro surprise.',
    steps: [
      {
        title: 'Demande de devis',
        description: 'Par téléphone, WhatsApp ou e-mail : décrivez le lieu et le besoin.',
      },
      {
        title: 'Intervention planifiée',
        description: 'Nous fixons ensemble un créneau et confirmons le périmètre.',
      },
      {
        title: 'Nettoyage effectué',
        description: 'Notre équipe intervient en suivant la check-list de la prestation.',
      },
      {
        title: 'Vérification',
        description: 'Contrôle final et retour de votre part : on ajuste si besoin.',
      },
    ],
  },
  de: {
    eyebrow: 'Ablauf',
    title: 'Vier Schritte, keine Überraschungen.',
    steps: [
      {
        title: 'Angebot anfragen',
        description: 'Per Telefon, WhatsApp oder E-Mail: Beschreiben Sie Objekt und Bedarf.',
      },
      {
        title: 'Termin planen',
        description: 'Wir vereinbaren gemeinsam einen Termin und klären den Umfang.',
      },
      {
        title: 'Reinigung durchführen',
        description: 'Unser Team arbeitet nach der Checkliste der jeweiligen Leistung.',
      },
      {
        title: 'Kontrolle',
        description: 'Endkontrolle und Ihr Feedback – bei Bedarf bessern wir nach.',
      },
    ],
  },
  en: {
    eyebrow: 'How it works',
    title: 'Four steps, no surprises.',
    steps: [
      {
        title: 'Request a quote',
        description: 'By phone, WhatsApp or email: tell us about the place and what you need.',
      },
      {
        title: 'Visit scheduled',
        description: 'We agree on a time slot together and confirm the scope.',
      },
      {
        title: 'Cleaning done',
        description: "Our team works through the service's checklist.",
      },
      {
        title: 'Final check',
        description: 'A final inspection and your feedback — we adjust if needed.',
      },
    ],
  },
}
