// =============================================================================
// reservation.schema.ts
// -----------------------------------------------------------------------------
// Validation des données de réservation lues dans l'adresse, AVANT usage :
// une adresse modifiée à la main ne doit jamais donner une date fantaisiste.
// =============================================================================

import { z } from 'zod'
import { parseIsoDay, toIsoDay } from '@/lib/date'

/** Jour calendaire ISO réel, "2026-11-09" ("2026-02-30" est refusé). */
export const isoDaySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => toIsoDay(parseIsoDay(value)) === value)
