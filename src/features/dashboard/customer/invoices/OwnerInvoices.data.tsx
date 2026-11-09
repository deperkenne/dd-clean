import type { Localized } from '@/lib/i18n'

type OwnerInvoicesContent = {
  back: string
  eyebrow: string
  title: (ownerName?: string) => string
  lead: string
  countLabel: (count: number) => string
  totalLabel: string
  loading: string
  emptyTitle: string
  empty: string
  error: string
  retry: string
  notFoundTitle: string
  notFound: string
  columns: { number: string; month: string; issuedOn: string; total: string; document: string }
  downloadPdf: string
  issuedOn: string
}

export const ownerInvoicesContent: Localized<OwnerInvoicesContent> = {
  fr: {
    back: 'Retour à mes propriétaires',
    eyebrow: 'Facturation',
    title: (ownerName) => (ownerName ? `Factures de ${ownerName}` : 'Factures du propriétaire'),
    lead: 'Une facture par mois, établie à partir de ses réservations. Chaque réservation n’est facturée qu’une seule fois.',
    countLabel: (count) => (count === 1 ? 'facture' : 'factures'),
    totalLabel: 'Total facturé',
    loading: 'Chargement des factures…',
    emptyTitle: 'Aucune facture pour l’instant',
    empty: 'Les factures de ce propriétaire apparaîtront ici dès qu’elles seront établies.',
    error: 'Les factures n’ont pas pu être chargées.',
    retry: 'Réessayer',
    notFoundTitle: 'Propriétaire introuvable',
    notFound: 'Ce propriétaire n’existe pas ou n’est pas rattaché à votre compte.',
    columns: { number: 'N° de facture', month: 'Mois facturé', issuedOn: 'Émise le', total: 'Montant', document: 'Document' },
    downloadPdf: 'Télécharger le PDF',
    issuedOn: 'Émise le',
  },
  de: {
    back: 'Zurück zu meinen Eigentümern',
    eyebrow: 'Abrechnung',
    title: (ownerName) => (ownerName ? `Rechnungen von ${ownerName}` : 'Rechnungen des Eigentümers'),
    lead: 'Eine Rechnung pro Monat, erstellt aus seinen Buchungen. Jede Buchung wird nur einmal berechnet.',
    countLabel: (count) => (count === 1 ? 'Rechnung' : 'Rechnungen'),
    totalLabel: 'Gesamt berechnet',
    loading: 'Rechnungen werden geladen…',
    emptyTitle: 'Noch keine Rechnungen',
    empty: 'Die Rechnungen dieses Eigentümers erscheinen hier, sobald sie erstellt sind.',
    error: 'Die Rechnungen konnten nicht geladen werden.',
    retry: 'Erneut versuchen',
    notFoundTitle: 'Eigentümer nicht gefunden',
    notFound: 'Dieser Eigentümer existiert nicht oder ist nicht mit Ihrem Konto verknüpft.',
    columns: { number: 'Rechnungsnr.', month: 'Abrechnungsmonat', issuedOn: 'Ausgestellt am', total: 'Betrag', document: 'Dokument' },
    downloadPdf: 'PDF herunterladen',
    issuedOn: 'Ausgestellt am',
  },
  en: {
    back: 'Back to my owners',
    eyebrow: 'Billing',
    title: (ownerName) => (ownerName ? `Invoices for ${ownerName}` : 'Owner invoices'),
    lead: 'One invoice per month, based on their bookings. Each booking is only invoiced once.',
    countLabel: (count) => (count === 1 ? 'invoice' : 'invoices'),
    totalLabel: 'Total invoiced',
    loading: 'Loading invoices…',
    emptyTitle: 'No invoices yet',
    empty: 'This owner’s invoices will appear here as soon as they are issued.',
    error: 'The invoices could not be loaded.',
    retry: 'Try again',
    notFoundTitle: 'Owner not found',
    notFound: 'This owner does not exist or is not linked to your account.',
    columns: { number: 'Invoice no.', month: 'Billing month', issuedOn: 'Issued on', total: 'Amount', document: 'Document' },
    downloadPdf: 'Download PDF',
    issuedOn: 'Issued on',
  },
}
