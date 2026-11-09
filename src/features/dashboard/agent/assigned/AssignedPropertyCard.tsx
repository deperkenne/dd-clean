import { UserIcon } from 'lucide-react'
import { useLocalized } from '@/hooks/useLocale'
import type { PropertyView } from '../../customer/properties/myProperties.types'
import { PropertyIdentity } from '../../customer/properties/PropertyIdentity'
import { assignedPropertiesContent } from './AssignedProperties.data'

/** Un logement attribué : nom, nom Smoobu, adresse, puis son propriétaire. */
export function AssignedPropertyCard({ property }: { property: PropertyView }) {
  const t = useLocalized(assignedPropertiesContent)

  return (
    <article className="relative h-full overflow-hidden rounded-xl border border-line bg-white p-4 md:p-5">
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-heading text-3xl leading-none font-medium text-ink/10 tabular-nums"
      >
        {property.position}
      </span>
      <div className="pr-12">
        <PropertyIdentity property={property} />
      </div>
      <p className="mt-4 flex min-w-0 items-start gap-2 border-t border-line pt-3 text-[14px] text-ink">
        <UserIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest" />
        <span className="min-w-0 break-words">
          <span className="text-muted-foreground">{t.owner} · </span>
          {property.ownerName}
        </span>
      </p>
    </article>
  )
}
