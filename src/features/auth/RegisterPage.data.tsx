import type { Localized } from '@/lib/i18n'

type RegisterContent = {
  logoLabel: string
  eyebrow: string
  title: string
  lead: string
  body: string
  contactCta: { label: string; href: string }
  loginCta: { label: string; href: string }
  backLabel: string
  languageLabel: string
}

export const registerContent: Localized<RegisterContent> = {
  fr: {
    logoLabel: 'D&D Clean — accueil',
    eyebrow: 'Espace équipe',
    title: 'Les comptes sont créés par D&D Clean',
    lead: "L'espace en ligne est réservé à notre équipe : agents, secrétariat et administration.",
    body: "Vous rejoignez l'équipe ? Votre accès vous est remis par l'administrateur. Vous êtes client ? Pas besoin de compte : contactez-nous pour un devis.",
    contactCta: { label: 'Nous contacter', href: '/#contact' },
    loginCta: { label: "J'ai déjà un compte", href: '/login' },
    backLabel: 'Retour au site',
    languageLabel: 'Choisir la langue',
  },
  de: {
    logoLabel: 'D&D Clean — Startseite',
    eyebrow: 'Team-Bereich',
    title: 'Konten werden von D&D Clean angelegt',
    lead: 'Der Online-Bereich ist unserem Team vorbehalten: Reinigungskräften, Sekretariat und Verwaltung.',
    body: 'Sie kommen neu ins Team? Ihren Zugang erhalten Sie von der Verwaltung. Sie sind Kunde? Dafür brauchen Sie kein Konto – fragen Sie einfach ein Angebot an.',
    contactCta: { label: 'Kontakt aufnehmen', href: '/#contact' },
    loginCta: { label: 'Ich habe bereits ein Konto', href: '/login' },
    backLabel: 'Zurück zur Website',
    languageLabel: 'Sprache wählen',
  },
  en: {
    logoLabel: 'D&D Clean — home',
    eyebrow: 'Team area',
    title: 'Accounts are created by D&D Clean',
    lead: 'The online area is reserved for our team: cleaners, office staff and admins.',
    body: "Joining the team? Your administrator will give you your access. A client? You don't need an account: just contact us for a quote.",
    contactCta: { label: 'Contact us', href: '/#contact' },
    loginCta: { label: 'I already have an account', href: '/login' },
    backLabel: 'Back to the website',
    languageLabel: 'Choose language',
  },
}
