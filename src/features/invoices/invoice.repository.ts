// =============================================================================
// invoice.repository.ts
// -----------------------------------------------------------------------------
// Contrat d'accès aux factures, indépendant de la source. Les hooks passent
// toujours par `invoice.repository.index.ts`.
// =============================================================================

import type { DownloadedFile, Uuid } from '@/lib/api.types'
import type { InvoiceResponse, InvoiceSummaryResponse } from './invoice.dto'

export interface InvoiceRepository {
  /**
   * Factures d'un propriétaire. Le back-end vérifie à partir du jeton que ce
   * propriétaire appartient bien au client connecté.
   */
  getOwnerInvoices(ownerId: Uuid): Promise<InvoiceSummaryResponse[]>
  /**
   * Génère la facture d'un propriétaire pour un mois ("2026-11"). Mêmes
   * vérifications d'appartenance côté back-end que pour la liste.
   */
  generateInvoice(ownerId: Uuid, month: string): Promise<InvoiceResponse>
  /** Facture officielle en PDF, produite par le back-end. */
  downloadInvoicePdf(invoiceId: number): Promise<DownloadedFile>
}
