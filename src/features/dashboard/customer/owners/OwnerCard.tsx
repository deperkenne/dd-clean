import { useLocalized } from '@/hooks/useLocale'
import { myOwnersContent } from './MyOwners.data'
import type { OwnerView } from './myOwners.types'
import { OwnerContact } from './OwnerContact'
import { OwnerIdentity } from './OwnerIdentity'
import { OwnerInvoicesLink } from './OwnerInvoicesLink'

/** Un propriétaire en carte (petits écrans). */
export function OwnerCard({ owner }: { owner: OwnerView }) {
  const t = useLocalized(myOwnersContent)

  return (
    <article className="relative overflow-hidden rounded-xl border border-line bg-white p-4">
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-heading text-3xl leading-none font-medium text-ink/10 tabular-nums"
      >
        {owner.position}
      </span>
      <div className="pr-12">
        <OwnerIdentity owner={owner} />
      </div>
      <div className="mt-3 border-t border-line pt-1">
        <OwnerContact owner={owner} />
      </div>
      <p className="mt-1 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-3 text-[13px]">
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">{t.addedOn}</span>
        <span className="text-ink tabular-nums">{owner.addedOn}</span>
      </p>
      <OwnerInvoicesLink owner={owner} className="mt-4 w-full" />
    </article>
  )
}
