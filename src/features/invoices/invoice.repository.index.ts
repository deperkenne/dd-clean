// =============================================================================
// invoice.repository.index.ts
// -----------------------------------------------------------------------------
// Point d'injection unique du InvoiceRepository. Les factures passent par le
// vrai back-end : il n'y a pas d'implémentation fictive pour ce domaine.
// =============================================================================

import { InvoiceRepositoryApi } from './invoice.repository.api'
import type { InvoiceRepository } from './invoice.repository'

export const invoiceRepository: InvoiceRepository = new InvoiceRepositoryApi()
