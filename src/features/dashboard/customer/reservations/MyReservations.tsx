import { CalendarXIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { DepartureList } from './DepartureList'
import { myReservationsContent } from './MyReservations.data'
import { useMyReservations } from './useMyReservations'

/** Section « Mes réservations » : réservations confirmées classées par jour de départ. */
export function MyReservations() {
  const t = useLocalized(myReservationsContent)
  const { schedule, isLoading, isError, isRetrying, retry } = useMyReservations()
  const isLoaded = !isLoading && !isError

  return (
    <section
      aria-labelledby="my-reservations-title"
      className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-16px_rgb(60_20_30/0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
    >
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 px-4 pt-6 pb-6 md:px-6 md:pt-8">
        <div className="min-w-0">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="my-reservations-title"
            className="mt-3 text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.015em] text-balance"
          >
            {t.title}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] text-muted-foreground">{t.lead}</p>
        </div>
        {isLoaded && (
          <p className="font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
            {t.count(schedule.total)}
          </p>
        )}
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

      {isLoaded && schedule.total === 0 && (
        <div className="flex items-start gap-4 border-t border-line px-4 py-8 md:px-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mint text-forest">
            <CalendarXIcon aria-hidden="true" className="size-5" />
          </span>
          <p className="max-w-[60ch] text-[15px] text-muted-foreground">{t.empty}</p>
        </div>
      )}

      {isLoaded && schedule.total > 0 && (
        <>
          <DepartureList id="departures-upcoming" title={t.upcomingTitle} days={schedule.upcoming} empty={t.noUpcoming} />
          <DepartureList id="departures-past" title={t.pastTitle} days={schedule.past} />
        </>
      )}
    </section>
  )
}
