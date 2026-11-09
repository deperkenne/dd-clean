import { BrushCleaningIcon } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { useLocalized } from '@/hooks/useLocale'
import { myPropertiesContent } from './MyProperties.data'
import type { PropertyView } from './myProperties.types'
import { PropertyAgentAssign } from './PropertyAgentAssign'

/** Agent attribué au logement (ou « Aucun agent »), puis le bouton pour l'attribuer ou le changer. */
export function PropertyAgent({ property }: { property: PropertyView }) {
  const t = useLocalized(myPropertiesContent)

  return (
    <div className="min-w-0">
      {property.agentName ? (
        <p className="flex min-w-0 items-center gap-2 text-[15px] font-medium text-ink">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink text-citron">
            <BrushCleaningIcon aria-hidden="true" className="size-3.5" />
          </span>
          <span className="sr-only">{t.agentLabel} : </span>
          <span className="min-w-0 break-words">{property.agentName}</span>
        </p>
      ) : (
        <StatusBadge tone="warning">{t.noAgent}</StatusBadge>
      )}
      <PropertyAgentAssign property={property} />
    </div>
  )
}
