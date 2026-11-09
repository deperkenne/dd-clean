import { useLocalized } from '@/hooks/useLocale'
import { ownerInvoicesContent } from './OwnerInvoices.data'
import type { InvoiceView } from './ownerInvoices.types'
import { InvoicePdfButton } from './InvoicePdfButton'

/** Une facture en carte (petits écrans). */
export function InvoiceCard({ invoice }: { invoice: InvoiceView }) {
  const t = useLocalized(ownerInvoicesContent)

  return (
    <article className="rounded-xl border border-line bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-heading text-lg font-semibold text-ink first-letter:uppercase">{invoice.month}</p>
        <p className="font-heading text-xl font-semibold text-ink tabular-nums">{invoice.total}</p>
      </div>
      <p className="mt-1 font-mono text-[13px] font-medium tracking-[0.04em] break-all text-forest">
        {invoice.invoiceNumber}
      </p>
      <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-3 text-[13px]">
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{t.issuedOn}</span>
        <span className="text-ink tabular-nums">{invoice.issuedOn}</span>
      </p>
      <InvoicePdfButton invoice={invoice} label={t.downloadPdf} className="mt-4 flex w-full" />
    </article>
  )
}
