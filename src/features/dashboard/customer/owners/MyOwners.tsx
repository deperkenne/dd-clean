import { Loader2Icon, RotateCwIcon, UserPlusIcon, UsersIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { myOwnersContent } from './MyOwners.data'
import { OwnerCard } from './OwnerCard'
import { OwnerTable } from './OwnerTable'
import { useMyOwners } from './useMyOwners'

/** Section « Mes propriétaires » : chargement, liste vide, erreur, liste. */
export function MyOwners() {
  const t = useLocalized(myOwnersContent)
  const { owners, isLoading, isError, isRetrying, retry } = useMyOwners()
  const isLoaded = !isLoading && !isError

  return (
    <section
      aria-labelledby="my-owners-title"
      className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-16px_rgb(60_20_30/0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
    >
      <header className="grid gap-6 px-4 pt-6 pb-6 md:px-6 md:pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
        <div className="min-w-0">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="my-owners-title"
            className="mt-3 max-w-[22ch] text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.015em] text-balance"
          >
            {t.title}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15px] text-muted-foreground">{t.lead}</p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 lg:justify-end lg:gap-8">
          {isLoaded && (
            <p className="flex items-baseline gap-2">
              <span className="font-heading text-[clamp(2.75rem,6vw,3.75rem)] leading-none font-semibold text-forest tabular-nums">
                {owners.length}
              </span>
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {t.countLabel(owners.length)}
              </span>
            </p>
          )}
          <ActionButton asChild className="bg-ink text-paper hover:bg-ink/85">
            <Link to={customerPaths.createOwner}>
              <UserPlusIcon aria-hidden="true" />
              {t.newOwner}
            </Link>
          </ActionButton>
        </div>
      </header>

      {isLoading && (
        <div role="status" aria-label={t.loading} className="flex flex-col gap-3 border-t border-line p-4 md:p-6">
          {[0, 1, 2].map((key) => (
            <Skeleton key={key} className="h-20 rounded-xl" />
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

      {isLoaded && owners.length === 0 && (
        <div className="flex items-start gap-4 border-t border-line px-4 py-10 md:px-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
            <UsersIcon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-ink">{t.emptyTitle}</p>
            <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.empty}</p>
          </div>
        </div>
      )}

      {owners.length > 0 && (
        <>
          <ul className="flex flex-col gap-3 border-t border-line bg-paper/40 p-4 lg:hidden">
            {owners.map((owner) => (
              <li key={owner.id}>
                <OwnerCard owner={owner} />
              </li>
            ))}
          </ul>
          <div className="hidden border-t border-line lg:block">
            <OwnerTable owners={owners} caption={t.title} />
          </div>
        </>
      )}
    </section>
  )
}
