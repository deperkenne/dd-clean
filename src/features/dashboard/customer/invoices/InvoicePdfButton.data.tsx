import type { Localized } from '@/lib/i18n'

type InvoicePdfButtonContent = {
  label: string
  pending: string
  ariaLabel: (invoiceNumber: string) => string
  error: string
}

export const invoicePdfButtonContent: Localized<InvoicePdfButtonContent> = {
  fr: {
    label: 'PDF',
    pending: 'Téléchargement…',
    ariaLabel: (invoiceNumber) => `Télécharger la facture ${invoiceNumber} en PDF`,
    error: 'Le PDF n’a pas pu être téléchargé.',
  },
  de: {
    label: 'PDF',
    pending: 'Wird geladen…',
    ariaLabel: (invoiceNumber) => `Rechnung ${invoiceNumber} als PDF herunterladen`,
    error: 'Das PDF konnte nicht heruntergeladen werden.',
  },
  en: {
    label: 'PDF',
    pending: 'Downloading…',
    ariaLabel: (invoiceNumber) => `Download invoice ${invoiceNumber} as PDF`,
    error: 'The PDF could not be downloaded.',
  },
}
