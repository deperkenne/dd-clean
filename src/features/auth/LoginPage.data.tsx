import type { Localized } from '@/lib/i18n'
import type { AuthErrorCode } from './auth.types'

type LoginContent = {
  logoLabel: string
  eyebrow: string
  title: string
  lead: string
  submit: string
  busy: string
  secureNote: string
  noAccount: string
  noAccountLink: string
  backLabel: string
  languageLabel: string
  errors: Record<AuthErrorCode, string>
}

export const loginContent: Localized<LoginContent> = {
  fr: {
    logoLabel: 'D&D Clean — accueil',
    eyebrow: 'Espace équipe',
    title: 'Accéder à votre espace',
    lead: 'Agents, secrétariat et administration : connectez-vous pour retrouver vos missions.',
    submit: 'Se connecter',
    busy: 'Connexion en cours…',
    secureNote: 'Vous allez être redirigé vers la page de connexion sécurisée de D&D Clean.',
    noAccount: 'Pas encore de compte ?',
    noAccountLink: 'Comment en obtenir un',
    backLabel: 'Retour au site',
    languageLabel: 'Choisir la langue',
    errors: {
      config: "La connexion n'est pas encore disponible. Réessayez plus tard ou contactez D&D Clean.",
      callback: 'La connexion a été annulée ou refusée. Vous pouvez réessayer.',
      invalid_token: "Votre compte n'a pas pu être vérifié. Contactez l'administrateur D&D Clean.",
      unknown: 'Le service de connexion ne répond pas. Vérifiez votre connexion internet et réessayez.',
    },
  },
  de: {
    logoLabel: 'D&D Clean — Startseite',
    eyebrow: 'Team-Bereich',
    title: 'In Ihren Bereich einloggen',
    lead: 'Reinigungskräfte, Sekretariat und Verwaltung: Melden Sie sich an, um Ihre Einsätze zu sehen.',
    submit: 'Anmelden',
    busy: 'Anmeldung läuft…',
    secureNote: 'Sie werden zur sicheren Anmeldeseite von D&D Clean weitergeleitet.',
    noAccount: 'Noch kein Konto?',
    noAccountLink: 'So erhalten Sie eines',
    backLabel: 'Zurück zur Website',
    languageLabel: 'Sprache wählen',
    errors: {
      config:
        'Die Anmeldung ist noch nicht verfügbar. Bitte versuchen Sie es später erneut oder kontaktieren Sie D&D Clean.',
      callback: 'Die Anmeldung wurde abgebrochen oder abgelehnt. Bitte versuchen Sie es erneut.',
      invalid_token: 'Ihr Konto konnte nicht geprüft werden. Bitte wenden Sie sich an die D&D-Clean-Verwaltung.',
      unknown:
        'Der Anmeldedienst antwortet nicht. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
    },
  },
  en: {
    logoLabel: 'D&D Clean — home',
    eyebrow: 'Team area',
    title: 'Sign in to your area',
    lead: 'Cleaners, office staff and admins: sign in to see your jobs.',
    submit: 'Sign in',
    busy: 'Signing in…',
    secureNote: "You'll be redirected to D&D Clean's secure sign-in page.",
    noAccount: "Don't have an account?",
    noAccountLink: 'How to get one',
    backLabel: 'Back to the website',
    languageLabel: 'Choose language',
    errors: {
      config: "Sign-in isn't available yet. Please try again later or contact D&D Clean.",
      callback: 'Sign-in was cancelled or refused. Please try again.',
      invalid_token: 'Your account could not be verified. Please contact the D&D Clean administrator.',
      unknown: "The sign-in service isn't responding. Check your internet connection and try again.",
    },
  },
}
