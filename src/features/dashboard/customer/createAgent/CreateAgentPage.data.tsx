import type { AgentFieldErrorCode } from '@/features/agents/agent.types'
import type { Localized } from '@/lib/i18n'
import type { CreateAgentFailure } from './createAgent.types'

type CreateAgentContent = {
  backLabel: string
  logoLabel: string
  documentLabel: string
  title: string
  lead: string
  optional: string
  identity: { title: string; description: string; firstName: string; lastName: string }
  contact: { title: string; description: string; email: string; emailHint: string; phone: string; phoneHint: string }
  secureNote: string
  submit: string
  submitting: string
  errors: Record<AgentFieldErrorCode, string>
  failures: Record<CreateAgentFailure, string>
  success: {
    eyebrow: string
    title: (name: string) => string
    details: (email: string) => string
    again: string
    back: string
  }
}

export const createAgentContent: Localized<CreateAgentContent> = {
  fr: {
    backLabel: 'Retour au tableau de bord',
    logoLabel: 'D&D Clean — accueil',
    documentLabel: 'Fiche agent de ménage',
    title: 'Ajouter un agent de ménage',
    lead: 'Renseignez l’identité et les coordonnées de l’agent. Il sera rattaché à votre compte par le serveur.',
    optional: '(facultatif)',
    identity: {
      title: 'Identité',
      description: 'Le nom de l’agent, tel qu’il apparaîtra dans vos plannings.',
      firstName: 'Prénom',
      lastName: 'Nom',
    },
    contact: {
      title: 'Coordonnées',
      description: 'L’adresse e-mail identifie l’agent : une seule fiche par adresse.',
      email: 'E-mail',
      emailHint: 'Ex. marie.dupont@exemple.de',
      phone: 'Téléphone',
      phoneHint: 'Ex. +49 911 123 45 67',
    },
    secureNote: 'Envoi sécurisé : l’agent est rattaché à votre compte par le serveur, jamais par le navigateur.',
    submit: 'Créer l’agent',
    submitting: 'Création…',
    errors: {
      required: 'Ce champ est obligatoire.',
      tooLong: 'Ce texte est trop long.',
      email: 'Adresse e-mail invalide.',
      phone: 'Numéro invalide : chiffres, espaces et + ( ) - / uniquement.',
      emailUsed: 'Un compte existe déjà avec cette adresse e-mail.',
      server: 'Valeur refusée par le serveur.',
    },
    failures: {
      invalid: 'Certaines informations ont été refusées. Vérifiez les champs signalés.',
      forbidden: 'Votre compte n’a pas le droit de créer un agent.',
      notFound: 'Votre compte client est introuvable. Contactez D&D Clean.',
      unknown: 'L’agent n’a pas pu être créé. Réessayez dans un instant.',
    },
    success: {
      eyebrow: 'Agent créé',
      title: (name) => `${name} fait partie de votre équipe.`,
      details: (email) => `E-mail : ${email}`,
      again: 'Ajouter un autre agent',
      back: 'Voir mes agents',
    },
  },
  de: {
    backLabel: 'Zurück zur Übersicht',
    logoLabel: 'D&D Clean — Startseite',
    documentLabel: 'Datenblatt Reinigungskraft',
    title: 'Reinigungskraft hinzufügen',
    lead: 'Geben Sie Identität und Kontaktdaten der Reinigungskraft an. Der Server ordnet sie Ihrem Konto zu.',
    optional: '(optional)',
    identity: {
      title: 'Identität',
      description: 'Der Name der Reinigungskraft, wie er in Ihren Einsatzplänen erscheint.',
      firstName: 'Vorname',
      lastName: 'Nachname',
    },
    contact: {
      title: 'Kontakt',
      description: 'Die E-Mail-Adresse identifiziert die Reinigungskraft: ein Datenblatt pro Adresse.',
      email: 'E-Mail',
      emailHint: 'z. B. maria.mueller@beispiel.de',
      phone: 'Telefon',
      phoneHint: 'z. B. +49 911 123 45 67',
    },
    secureNote: 'Sichere Übertragung: Die Zuordnung zu Ihrem Konto erfolgt durch den Server, nie durch den Browser.',
    submit: 'Reinigungskraft anlegen',
    submitting: 'Wird angelegt…',
    errors: {
      required: 'Pflichtfeld.',
      tooLong: 'Dieser Text ist zu lang.',
      email: 'Ungültige E-Mail-Adresse.',
      phone: 'Ungültige Nummer: nur Ziffern, Leerzeichen und + ( ) - /.',
      emailUsed: 'Mit dieser E-Mail-Adresse existiert bereits ein Konto.',
      server: 'Vom Server abgelehnter Wert.',
    },
    failures: {
      invalid: 'Einige Angaben wurden abgelehnt. Bitte prüfen Sie die markierten Felder.',
      forbidden: 'Ihr Konto darf keine Reinigungskraft anlegen.',
      notFound: 'Ihr Kundenkonto wurde nicht gefunden. Bitte kontaktieren Sie D&D Clean.',
      unknown: 'Die Reinigungskraft konnte nicht angelegt werden. Bitte versuchen Sie es gleich erneut.',
    },
    success: {
      eyebrow: 'Reinigungskraft angelegt',
      title: (name) => `${name} gehört jetzt zu Ihrem Team.`,
      details: (email) => `E-Mail: ${email}`,
      again: 'Weitere Reinigungskraft hinzufügen',
      back: 'Meine Reinigungskräfte ansehen',
    },
  },
  en: {
    backLabel: 'Back to dashboard',
    logoLabel: 'D&D Clean — home',
    documentLabel: 'Cleaning agent record',
    title: 'Add a cleaning agent',
    lead: 'Enter the agent’s identity and contact details. The server links them to your account.',
    optional: '(optional)',
    identity: {
      title: 'Identity',
      description: 'The agent’s name, as it will appear in your schedules.',
      firstName: 'First name',
      lastName: 'Last name',
    },
    contact: {
      title: 'Contact',
      description: 'The email address identifies the agent: one record per address.',
      email: 'Email',
      emailHint: 'e.g. mary.miller@example.com',
      phone: 'Phone',
      phoneHint: 'e.g. +49 911 123 45 67',
    },
    secureNote: 'Secure submission: the agent is linked to your account by the server, never by the browser.',
    submit: 'Create agent',
    submitting: 'Creating…',
    errors: {
      required: 'This field is required.',
      tooLong: 'This text is too long.',
      email: 'Invalid email address.',
      phone: 'Invalid number: digits, spaces and + ( ) - / only.',
      emailUsed: 'An account already exists with this email address.',
      server: 'Value refused by the server.',
    },
    failures: {
      invalid: 'Some details were refused. Check the highlighted fields.',
      forbidden: 'Your account is not allowed to create an agent.',
      notFound: 'Your customer account could not be found. Contact D&D Clean.',
      unknown: 'The agent could not be created. Please try again shortly.',
    },
    success: {
      eyebrow: 'Agent created',
      title: (name) => `${name} is now part of your team.`,
      details: (email) => `Email: ${email}`,
      again: 'Add another agent',
      back: 'View my agents',
    },
  },
}
