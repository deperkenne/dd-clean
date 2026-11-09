/** Une facture prête à afficher : textes déjà formatés dans la langue active. */
export type InvoiceView = {
  id: number
  invoiceNumber: string
  /** Mois facturé tel que reçu, "2026-11" (pour retrouver la facture d'un mois). */
  billingMonth: string
  /** « novembre 2026 » */
  month: string
  /** « 4 nov. 2026 » */
  issuedOn: string
  /** « 245,50 € » */
  total: string
}
