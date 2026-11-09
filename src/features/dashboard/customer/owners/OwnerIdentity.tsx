import { useLocalized } from '@/hooks/useLocale'
import { myOwnersContent } from './MyOwners.data'
import type { OwnerView } from './myOwners.types'
import { OwnerMonogram } from './OwnerMonogram'

/** Monogramme, nom et référence client d'un propriétaire. */
export function OwnerIdentity({ owner }: { owner: OwnerView }) {
  const t = useLocalized(myOwnersContent)

  return (
    <div className="flex min-w-0 items-center gap-3.5">
      <OwnerMonogram initials={owner.initials} />
      <div className="min-w-0">
        <p className="text-[16px] leading-snug font-semibold break-words text-ink">{owner.name}</p>
        <p className="mt-1 font-mono text-[11px] leading-snug tracking-[0.04em] break-all text-muted-foreground">
          <span className="block tracking-[0.1em] uppercase">{t.customerRef}</span>
          {owner.customerId}
        </p>
      </div>
    </div>
  )
}
