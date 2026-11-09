import { HouseIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { assignedPropertiesContent } from './AssignedProperties.data'
import { AssignedPropertyCard } from './AssignedPropertyCard'
import { useAssignedProperties } from './useAssignedProperties'

/** Section « Mes logements » de l'agent : chargement, liste vide, erreur, liste. */
export function AssignedProperties() {
  const t = useLocalized(assignedPropertiesContent)
  const { properties, isLoading, isError, isRetrying, retry } = useAssignedProperties()
  const isLoaded = !isLoading && !isError

  return (
    <section
      aria-labelledby="assigned-properties-title"
      className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-16px_rgb(20_40_30/0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
    >
      <header className="flex flex-wrap items-end justify-between gap-6 px-4 pt-6 pb-6 md:px-6 md:pt-8">
        <div className="min-w-0">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1
            id="assigned-properties-title"
            className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.015em] text-balance"
          >
            {t.title}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] text-muted-foreground">{t.lead}</p>
        </div>
        {isLoaded && (
          <p className="flex items-baseline gap-2">
            <span className="font-heading text-[clamp(2.75rem,6vw,3.75rem)] leading-none font-semibold text-forest tabular-nums">
              {properties.length}
            </span>
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {t.countLabel(properties.length)}
            </span>
          </p>
        )}
      </header>

      {isLoading && (
        <div role="status" aria-label={t.loading} className="grid gap-3 border-t border-line p-4 md:grid-cols-2 md:p-6">
          {[0, 1, 2, 3].map((key) => (
            <Skeleton key={key} className="h-32 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <div role="alert" className="flex flex-col items-start gap-4 border-t border-line px-4 py-8 md:px-6">
          <p className="text-[15px] text-ink">{t.error}</p>
          <ActionButton type="button" variant="outline" onClick={retry} disabled={isRetrying} className="border-ink">
            {isRetrying ? (
              <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
            ) : (
              <RotateCwIcon aria-hidden="true" />
            )}
            {t.retry}
          </ActionButton>
        </div>
      )}

      {isLoaded && properties.length === 0 && (
        <div className="flex items-start gap-4 border-t border-line px-4 py-10 md:px-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
            <HouseIcon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{t.emptyTitle}</p>
            <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.empty}</p>
          </div>
        </div>
      )}

      {properties.length > 0 && (
        <ul
          aria-label={t.listLabel}
          className="grid gap-3 border-t border-line bg-paper/40 p-4 md:grid-cols-2 md:p-6 xl:grid-cols-3"
        >
          {properties.map((property) => (
            <li key={property.id} className="min-w-0">
              <AssignedPropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
