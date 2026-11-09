import { useLocalized } from '@/hooks/useLocale'
import { myPropertiesContent } from './MyProperties.data'
import type { PropertyView } from './myProperties.types'

/** Propriétaire du logement et sa référence client. */
export function PropertyOwner({ property }: { property: PropertyView }) {
  const t = useLocalized(myPropertiesContent)

  return (
    <div className="min-w-0">
      <p className="text-[15px] leading-snug font-medium break-words text-ink">{property.ownerName}</p>
      <p className="mt-1 font-mono text-[11px] leading-snug tracking-[0.04em] break-all text-muted-foreground">
        <span className="block tracking-[0.1em] uppercase">{t.ownerRef}</span>
        {property.ownerCustomerId}
      </p>
    </div>
  )
}
