import { HouseIcon, MapPinIcon } from 'lucide-react'
import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { myPropertiesContent } from './MyProperties.data'
import type { PropertyView } from './myProperties.types'

/** Nom du logement, son nom Smoobu et son adresse. */
export function PropertyIdentity({ property }: { property: PropertyView }) {
  const t = useLocalized(myPropertiesContent)

  return (
    <div className="flex min-w-0 items-start gap-3.5">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)]"
      >
        <HouseIcon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[16px] leading-snug font-semibold break-words text-ink">{property.name}</p>
        <p className="mt-1 font-mono text-[11px] leading-snug tracking-[0.04em] break-words text-muted-foreground">
          <span className="tracking-[0.1em] uppercase">{t.smoobuLabel}</span> · {property.emailLabel}
        </p>
        <p
          className={cn(
            'mt-1.5 flex min-w-0 items-start gap-1.5 text-[13px] leading-snug',
            property.address ? 'text-ink' : 'text-muted-foreground',
          )}
        >
          <MapPinIcon aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-forest/70" />
          <span className="min-w-0 break-words">{property.address ?? t.noAddress}</span>
        </p>
      </div>
    </div>
  )
}
