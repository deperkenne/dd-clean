import type { GenerateInvoiceErrorCode } from '@/features/invoices/invoice.types'
import type { Localized } from '@/lib/i18n'
import type { GenerateInvoiceFailure } from './generateInvoice.types'

type GenerateInvoiceContent = {
  title: string
  lead: string
  monthLabel: string
  monthHint: string
  submit: string
  pending: string
  errors: Record<GenerateInvoiceErrorCode, string>
  failures: Record<GenerateInvoiceFailure, string>
  successTitle: (invoiceNumber: string) => string
  existingSummary: (invoiceNumber: string, month: string, total: string) => string
  downloadPdf: string
  success: (month: string, lineCount: number, total: string) => string
}

export const generateInvoiceContent: Localized<GenerateInvoiceContent> = {
  fr: {
    title: 'Générer une facture',
    lead: 'Choisissez le mois : toutes les réservations de ce mois pas encore facturées y sont reprises.',
    monthLabel: 'Mois facturé',
    monthHint: 'Mois en cours par défaut.',
    submit: 'Générer la facture',
    pending: 'Génération…',
    errors: {
      required: 'Indiquez le mois à facturer.',
      format: 'Format attendu : AAAA-MM, par exemple 2026-11.',
      future: 'Impossible de facturer un mois à venir.',
    },
    failures: {
      conflict: 'Une facture existe déjà pour ce mois.',
      rejected: 'La facture de ce mois ne peut pas encore être générée.',
      invalid: 'La facture n’a pas pu être générée pour ce mois (aucune réservation à facturer ou mois refusé).',
      nothingToInvoice: 'Aucune facture n’a pu être générée pour ce mois : il n’y a rien à facturer.',
      forbidden: 'Ce propriétaire n’est pas rattaché à votre compte.',
      unknown: 'La facture n’a pas pu être générée. Réessayez dans un instant.',
    },
    successTitle: (invoiceNumber) => `Facture ${invoiceNumber} générée`,
    existingSummary: (invoiceNumber, month, total) => `Facture ${invoiceNumber} · ${month} · ${total}`,
    downloadPdf: 'Télécharger le PDF',
    success: (month, lineCount, total) =>
      `${month} · ${lineCount === 1 ? '1 réservation' : `${lineCount} réservations`} · ${total}`,
  },
  de: {
    title: 'Rechnung erstellen',
    lead: 'Wählen Sie den Monat: Alle noch nicht berechneten Buchungen dieses Monats werden übernommen.',
    monthLabel: 'Abrechnungsmonat',
    monthHint: 'Standardmäßig der aktuelle Monat.',
    submit: 'Rechnung erstellen',
    pending: 'Wird erstellt…',
    errors: {
      required: 'Geben Sie den Abrechnungsmonat an.',
      format: 'Erwartetes Format: JJJJ-MM, z. B. 2026-11.',
      future: 'Ein zukünftiger Monat kann nicht berechnet werden.',
    },
    failures: {
      conflict: 'Für diesen Monat gibt es bereits eine Rechnung.',
      rejected: 'Die Rechnung für diesen Monat kann noch nicht erstellt werden.',
      invalid: 'Für diesen Monat konnte keine Rechnung erstellt werden (keine Buchung zu berechnen oder Monat abgelehnt).',
      nothingToInvoice: 'Für diesen Monat konnte keine Rechnung erstellt werden: Es gibt nichts zu berechnen.',
      forbidden: 'Dieser Eigentümer ist nicht mit Ihrem Konto verknüpft.',
      unknown: 'Die Rechnung konnte nicht erstellt werden. Bitte versuchen Sie es gleich erneut.',
    },
    successTitle: (invoiceNumber) => `Rechnung ${invoiceNumber} erstellt`,
    existingSummary: (invoiceNumber, month, total) => `Rechnung ${invoiceNumber} · ${month} · ${total}`,
    downloadPdf: 'PDF herunterladen',
    success: (month, lineCount, total) =>
      `${month} · ${lineCount === 1 ? '1 Buchung' : `${lineCount} Buchungen`} · ${total}`,
  },
  en: {
    title: 'Generate an invoice',
    lead: 'Pick the month: every booking from that month not yet invoiced is included.',
    monthLabel: 'Billing month',
    monthHint: 'Current month by default.',
    submit: 'Generate invoice',
    pending: 'Generating…',
    errors: {
      required: 'Enter the month to invoice.',
      format: 'Expected format: YYYY-MM, e.g. 2026-11.',
      future: 'A future month cannot be invoiced.',
    },
    failures: {
      conflict: 'An invoice already exists for this month.',
      rejected: 'This month’s invoice cannot be generated yet.',
      invalid: 'No invoice could be generated for this month (nothing to invoice or month rejected).',
      nothingToInvoice: 'No invoice could be generated for this month: there is nothing to invoice.',
      forbidden: 'This owner is not linked to your account.',
      unknown: 'The invoice could not be generated. Please try again shortly.',
    },
    successTitle: (invoiceNumber) => `Invoice ${invoiceNumber} generated`,
    existingSummary: (invoiceNumber, month, total) => `Invoice ${invoiceNumber} · ${month} · ${total}`,
    downloadPdf: 'Download PDF',
    success: (month, lineCount, total) =>
      `${month} · ${lineCount === 1 ? '1 booking' : `${lineCount} bookings`} · ${total}`,
  },
}
