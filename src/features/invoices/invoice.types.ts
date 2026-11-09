// =============================================================================
// invoice.types.ts
// -----------------------------------------------------------------------------
// Entités JPA de facturation (Invoice, InvoiceLine), champ pour champ, et le
// DTO de réponse InvoiceLineResponse. Même convention que
// `properties/backend.types.ts` : une relation devient l'identifiant lié,
// un champ sans `nullable = false` peut valoir `null`.
// =============================================================================

import type { Decimal, IsoDate, IsoInstant, Uuid } from '@/lib/api.types'

/** Facture mensuelle d'un propriétaire (table `invoices`), une seule par propriétaire et par mois. */
export type Invoice = {
  id: number
  ownerId: Uuid
  /** Ex. "F-2026-11-DD-0001". */
  invoiceNumber: string
  /** Mois facturé, au format "2026-11". */
  billingMonth: string
  total: Decimal
  createdAt: IsoInstant
}

/** Ligne de facture (table `invoice_lines`) : une réservation n'est facturée qu'une seule fois. */
export type InvoiceLine = {
  id: number
  invoiceId: number
  reservationId: number
  bookingNumber: string
  propertyName: string
  roomNumber: string | null
  checkIn: IsoDate
  checkOut: IsoDate
  basePrice: Decimal
  sundaySurcharge: Decimal
  lineTotal: Decimal
}

/**
 * Ligne de facture renvoyée par l'API (record `InvoiceLineResponse`).
 * Attention : les noms diffèrent de l'entité (`bookingReference` = `bookingNumber`,
 * `arrivalDate` = `checkIn`, `departureDate` = `checkOut`).
 */
export type InvoiceLineResponse = {
  id: number
  reservationId: number
  bookingReference: string
  propertyName: string
  roomNumber: string | null
  arrivalDate: IsoDate
  departureDate: IsoDate
  basePrice: Decimal
  sundaySurcharge: Decimal
  lineTotal: Decimal
}

/** Codes d'erreur du champ « mois » du formulaire de génération (traduits par l'UI). */
export const GENERATE_INVOICE_ERROR_CODES = ['required', 'format', 'future'] as const

export type GenerateInvoiceErrorCode = (typeof GENERATE_INVOICE_ERROR_CODES)[number]

/** Saisie du formulaire de génération : le mois facturé, "2026-11". */
export type GenerateInvoiceFormValues = { month: string }
