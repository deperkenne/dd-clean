import { useLocalized } from '@/hooks/useLocale'
import { myPropertiesContent } from './MyProperties.data'
import type { PropertyView } from './myProperties.types'
import { PropertyAgent } from './PropertyAgent'
import { PropertyIdentity } from './PropertyIdentity'
import { PropertyOwner } from './PropertyOwner'

const sectionLabel = 'mb-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase'

/** Un logement en carte (petits écrans). */
export function PropertyCard({ property }: { property: PropertyView }) {
  const t = useLocalized(myPropertiesContent)

  return (
    <article className="relative h-full overflow-hidden rounded-xl border border-line bg-white p-4">
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-heading text-3xl leading-none font-medium text-ink/10 tabular-nums"
      >
        {property.position}
      </span>
      <div className="pr-12">
        <PropertyIdentity property={property} />
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className={sectionLabel}>{t.columns.owner}</p>
        <PropertyOwner property={property} />
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className={sectionLabel}>{t.columns.agent}</p>
        <PropertyAgent property={property} />
      </div>
    </article>
  )
}
