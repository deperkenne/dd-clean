// =============================================================================
// invoice.repository.api.ts
// -----------------------------------------------------------------------------
// Implémentation réelle : `GET` et `POST /api/owners/{ownerId}/invoices`,
// et `GET /api/invoices/{id}/pdf` pour le PDF officiel.
// `http()` joint le jeton Keycloak (`Authorization: Bearer …`). Le back-end
// vérifie le rôle (`@PreAuthorize`) puis que le propriétaire demandé
// appartient à l'appelant (`Caller.of(authentication)`).
// =============================================================================

import type { DownloadedFile, Uuid } from '@/lib/api.types'
import { http, httpFile } from '@/lib/http'
import type { InvoiceResponse, InvoiceSummaryResponse } from './invoice.dto'
import type { InvoiceRepository } from './invoice.repository'

export class InvoiceRepositoryApi implements InvoiceRepository {
  getOwnerInvoices(ownerId: Uuid): Promise<InvoiceSummaryResponse[]> {
    return http<InvoiceSummaryResponse[]>(`/api/owners/${encodeURIComponent(ownerId)}/invoices`)
  }

  /** Le mois part en paramètre d'URL (`?month=2026-11`), comme l'attend `@RequestParam`. */
  generateInvoice(ownerId: Uuid, month: string): Promise<InvoiceResponse> {
    const query = new URLSearchParams({ month })
    return http<InvoiceResponse>(`/api/owners/${encodeURIComponent(ownerId)}/invoices?${query}`, { method: 'POST' })
  }

  downloadInvoicePdf(invoiceId: number): Promise<DownloadedFile> {
    return httpFile(`/api/invoices/${invoiceId}/pdf`, { headers: { Accept: 'application/pdf' } })
  }
}
