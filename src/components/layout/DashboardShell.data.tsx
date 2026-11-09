import type { Localized } from '@/lib/i18n'

type DashboardShellContent = {
  logoLabel: string
  languageLabel: string
  logout: string
  signedInAs: string
}

export const dashboardShellContent: Localized<DashboardShellContent> = {
  fr: {
    logoLabel: 'D&D Clean — site public',
    languageLabel: 'Choisir la langue',
    logout: 'Se déconnecter',
    signedInAs: 'Connecté en tant que',
  },
  de: {
    logoLabel: 'D&D Clean — öffentliche Website',
    languageLabel: 'Sprache wählen',
    logout: 'Abmelden',
    signedInAs: 'Angemeldet als',
  },
  en: {
    logoLabel: 'D&D Clean — public website',
    languageLabel: 'Choose language',
    logout: 'Log out',
    signedInAs: 'Signed in as',
  },
}
