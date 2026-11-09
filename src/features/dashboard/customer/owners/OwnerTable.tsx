import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myOwnersContent } from './MyOwners.data'
import type { OwnerView } from './myOwners.types'
import { OwnerContact } from './OwnerContact'
import { OwnerIdentity } from './OwnerIdentity'
import { OwnerInvoicesLink } from './OwnerInvoicesLink'

const headCell =
  'px-4 py-3 text-left font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase first:pl-6 last:pr-6'
const bodyCell = 'px-4 py-5 align-middle first:pl-6 last:pr-6'

/** Les propriétaires en tableau (grands écrans). */
export function OwnerTable({ owners, caption }: { owners: OwnerView[]; caption: string }) {
  const t = useLocalized(myOwnersContent)

  return (
    <table className="w-full border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-paper/70">
        <tr>
          <th scope="col" className={cn(headCell, 'w-16')}>{t.columns.position}</th>
          <th scope="col" className={headCell}>{t.columns.owner}</th>
          <th scope="col" className={headCell}>{t.columns.contact}</th>
          <th scope="col" className={headCell}>{t.columns.addedOn}</th>
          <th scope="col" className={cn(headCell, 'text-right')}>{t.columns.billing}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {owners.map((owner) => (
          <tr key={owner.id} className="group transition-colors hover:bg-mint/35">
            <td className={bodyCell}>
              <span className="font-heading text-2xl leading-none font-medium text-ink/25 tabular-nums transition-colors group-hover:text-forest">
                {owner.position}
              </span>
            </td>
            <td className={cn(bodyCell, 'max-w-[24rem]')}>
              <OwnerIdentity owner={owner} />
            </td>
            <td className={cn(bodyCell, 'max-w-[20rem]')}>
              <OwnerContact owner={owner} />
            </td>
            <td className={cn(bodyCell, 'whitespace-nowrap text-ink tabular-nums')}>{owner.addedOn}</td>
            <td className={cn(bodyCell, 'text-right')}>
              <OwnerInvoicesLink owner={owner} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
