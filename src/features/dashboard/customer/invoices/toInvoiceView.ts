import type { InvoiceSummaryResponse } from '@/features/invoices/invoice.dto'
import type { Locale } from '@/lib/i18n'
import type { InvoiceView } from './ownerInvoices.types'

export function formatEuro(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(amount)
}

/** "2026-11" → « novembre 2026 » (le mois facturé n'a pas de jour). */
export function formatBillingMonth(billingMonth: string, locale: Locale): string {
  const [year, month] = billingMonth.split('-').map(Number)
  if (!year || !month) return billingMonth
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date(year, month - 1, 1))
}

/** Réponse de l'API → facture affichable (mois, date d'émission et total mis en forme). */
export function toInvoiceView(invoice: InvoiceSummaryResponse, locale: Locale): InvoiceView {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    billingMonth: invoice.billingMonth,
    month: formatBillingMonth(invoice.billingMonth, locale),
    issuedOn: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(
      new Date(invoice.createdAt),
    ),
    total: formatEuro(invoice.total, locale),
  }
}
