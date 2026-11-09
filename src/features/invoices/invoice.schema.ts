// =============================================================================
// invoice.schema.ts
// -----------------------------------------------------------------------------
// Validation du mois à facturer, AVANT tout appel au back-end : même format
// que `@DateTimeFormat(pattern = "yyyy-MM")` côté Java, et jamais un mois à
// venir (il n'y aurait encore rien à facturer).
// =============================================================================

import { z } from 'zod'
import { GENERATE_INVOICE_ERROR_CODES } from './invoice.types'

const [requiredCode, formatCode, futureCode] = GENERATE_INVOICE_ERROR_CODES

/** Mois en cours, au format "2026-11" (heure locale). */
export function currentBillingMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const billingMonthSchema = z
  .string()
  .trim()
  .min(1, requiredCode)
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, formatCode)
  // Comparer "2026-11" et "2026-12" comme du texte suffit : le format est fixe.
  .refine((month) => month <= currentBillingMonth(), futureCode)

export const generateInvoiceSchema = z.object({ month: billingMonthSchema })

export function isGenerateInvoiceErrorCode(code: string | undefined): code is (typeof GENERATE_INVOICE_ERROR_CODES)[number] {
  return GENERATE_INVOICE_ERROR_CODES.some((known) => known === code)
}
