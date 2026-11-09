import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { ownerInvoicesContent } from './OwnerInvoices.data'
import type { InvoiceView } from './ownerInvoices.types'
import { InvoicePdfButton } from './InvoicePdfButton'

const headCell =
  'px-4 py-3 text-left font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase first:pl-6 last:pr-6'
const bodyCell = 'px-4 py-5 align-middle first:pl-6 last:pr-6'

/** Les factures en tableau (grands écrans). */
export function InvoiceTable({ invoices, caption }: { invoices: InvoiceView[]; caption: string }) {
  const t = useLocalized(ownerInvoicesContent)

  return (
    <table className="w-full border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-paper/70">
        <tr>
          <th scope="col" className={headCell}>{t.columns.month}</th>
          <th scope="col" className={headCell}>{t.columns.number}</th>
          <th scope="col" className={headCell}>{t.columns.issuedOn}</th>
          <th scope="col" className={cn(headCell, 'text-right')}>{t.columns.total}</th>
          <th scope="col" className={cn(headCell, 'text-right')}>{t.columns.document}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="transition-colors hover:bg-mint/35">
            <td className={cn(bodyCell, 'font-heading text-lg font-semibold text-ink first-letter:uppercase')}>
              {invoice.month}
            </td>
            <td className={cn(bodyCell, 'font-mono text-[13px] font-medium tracking-[0.04em] break-all text-forest')}>
              {invoice.invoiceNumber}
            </td>
            <td className={cn(bodyCell, 'whitespace-nowrap text-muted-foreground tabular-nums')}>{invoice.issuedOn}</td>
            <td className={cn(bodyCell, 'text-right text-[17px] font-semibold whitespace-nowrap text-ink tabular-nums')}>
              {invoice.total}
            </td>
            <td className={cn(bodyCell, 'text-right')}>
              <InvoicePdfButton invoice={invoice} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
