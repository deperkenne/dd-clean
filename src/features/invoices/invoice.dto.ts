// =============================================================================
// invoice.dto.ts
// -----------------------------------------------------------------------------
// Réponses de l'API de facturation (records Java InvoiceSummaryResponse et
// InvoiceResponse). La ligne de facture (`InvoiceLineResponse`) vit dans
// `invoice.types.ts`.
// =============================================================================

import type { Decimal, IsoInstant, Uuid } from '@/lib/api.types'
import type { InvoiceLineResponse } from './invoice.types'

/** En-tête d'une facture, tel que renvoyé par `GET /api/owners/{ownerId}/invoices`. */
export type InvoiceSummaryResponse = {
  id: number
  /** Ex. "F-2026-11-DD-0001". */
  invoiceNumber: string
  /** Mois facturé, au format "2026-11". */
  billingMonth: string
  total: Decimal
  createdAt: IsoInstant
  ownerId: Uuid
  ownerCustomerId: string
  ownerName: string
}

/** Facture complète : en-tête + lignes. */
export type InvoiceResponse = {
  invoice: InvoiceSummaryResponse
  lines: InvoiceLineResponse[]
}
