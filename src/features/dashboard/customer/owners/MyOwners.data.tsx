import type { Localized } from '@/lib/i18n'

type MyOwnersContent = {
  eyebrow: string
  title: string
  lead: string
  countLabel: (count: number) => string
  newOwner: string
  loading: string
  emptyTitle: string
  empty: string
  error: string
  retry: string
  columns: { position: string; owner: string; contact: string; addedOn: string; billing: string }
  invoices: string
  invoicesFor: (name: string) => string
  customerRef: string
  emailLabel: string
  phoneLabel: string
  notProvided: string
  addedOn: string
}

export const myOwnersContent: Localized<MyOwnersContent> = {
  fr: {
    eyebrow: 'Mes propriétaires',
    title: 'Votre portefeuille de propriétaires',
    lead: 'Les propriétaires rattachés à votre compte. Chaque ajout apparaît ici dès sa création.',
    countLabel: (count) => (count === 1 ? 'propriétaire' : 'propriétaires'),
    newOwner: 'Nouveau propriétaire',
    loading: 'Chargement de vos propriétaires…',
    emptyTitle: 'Aucun propriétaire pour l’instant',
    empty: 'Créez votre premier propriétaire, avec ses logements et ses chambres : il apparaîtra ici.',
    error: 'Vos propriétaires n’ont pas pu être chargés.',
    retry: 'Réessayer',
    columns: { position: 'N°', owner: 'Propriétaire', contact: 'Contact', addedOn: 'Ajouté le', billing: 'Facturation' },
    invoices: 'Factures',
    invoicesFor: (name) => `Voir les factures de ${name}`,
    customerRef: 'Réf. client',
    emailLabel: 'E-mail',
    phoneLabel: 'Téléphone',
    notProvided: 'Non renseigné',
    addedOn: 'Ajouté le',
  },
  de: {
    eyebrow: 'Meine Eigentümer',
    title: 'Ihr Eigentümer-Portfolio',
    lead: 'Die mit Ihrem Konto verknüpften Eigentümer. Jeder neue Eintrag erscheint hier sofort nach dem Anlegen.',
    countLabel: () => 'Eigentümer',
    newOwner: 'Neuer Eigentümer',
    loading: 'Ihre Eigentümer werden geladen…',
    emptyTitle: 'Noch keine Eigentümer',
    empty: 'Legen Sie Ihren ersten Eigentümer mit seinen Unterkünften und Zimmern an – er erscheint dann hier.',
    error: 'Ihre Eigentümer konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    columns: { position: 'Nr.', owner: 'Eigentümer', contact: 'Kontakt', addedOn: 'Angelegt am', billing: 'Abrechnung' },
    invoices: 'Rechnungen',
    invoicesFor: (name) => `Rechnungen von ${name} ansehen`,
    customerRef: 'Kundenref.',
    emailLabel: 'E-Mail',
    phoneLabel: 'Telefon',
    notProvided: 'Nicht angegeben',
    addedOn: 'Angelegt am',
  },
  en: {
    eyebrow: 'My owners',
    title: 'Your owner portfolio',
    lead: 'The owners linked to your account. Each new one appears here as soon as it is created.',
    countLabel: (count) => (count === 1 ? 'owner' : 'owners'),
    newOwner: 'New owner',
    loading: 'Loading your owners…',
    emptyTitle: 'No owners yet',
    empty: 'Create your first owner, with their properties and rooms – they will appear here.',
    error: 'Your owners could not be loaded.',
    retry: 'Try again',
    columns: { position: 'No.', owner: 'Owner', contact: 'Contact', addedOn: 'Added on', billing: 'Billing' },
    invoices: 'Invoices',
    invoicesFor: (name) => `View invoices for ${name}`,
    customerRef: 'Customer ref.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    notProvided: 'Not provided',
    addedOn: 'Added on',
  },
}
