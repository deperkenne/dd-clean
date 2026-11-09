/** Raison d'un échec de génération, traduite par l'UI. */
export type GenerateInvoiceFailure = 'conflict' | 'rejected' | 'invalid' | 'nothingToInvoice' | 'forbidden' | 'unknown'

/** Facture que l'on vient de générer, prête à afficher. */
export type GeneratedInvoiceSummary = {
  id: number
  invoiceNumber: string
  /** « novembre 2026 » */
  month: string
  /** « 245,50 € » */
  total: string
  /** Nombre de réservations facturées. */
  lineCount: number
}
