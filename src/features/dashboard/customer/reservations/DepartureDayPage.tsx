import { CalendarXIcon, Loader2Icon, RotateCwIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { BackLink } from '@/components/common/BackLink'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { departureDayPageContent } from './DepartureDayPage.data'
import { DepartureDayHero } from './DepartureDayHero'
import { DepartureDayReservations } from './DepartureDayReservations'
import { useDepartureDay } from './useDepartureDay'

/** Page « journée » : toutes les réservations confirmées qui partent ce jour-là, avec le filtre par logement. */
export function DepartureDayPage() {
  const t = useLocalized(departureDayPageContent)
  const { date = '' } = useParams()
  const { day, isInvalidDate, isLoading, isError, isRetrying, retry } = useDepartureDay(date)

  return (
    <div className="flex flex-col gap-4">
      <BackLink to={customerPaths.reservations} label={t.back} />

      <section
        aria-labelledby="departure-day-title"
        className="min-w-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_16px_40px_-16px_rgb(60_20_30/0.18)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
      >
        {isInvalidDate && (
          <div role="alert" className="flex items-start gap-4 px-4 py-10 md:px-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
              <CalendarXIcon aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <h1 id="departure-day-title" className="font-semibold text-ink">
                {t.invalidTitle}
              </h1>
              <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.invalid}</p>
            </div>
          </div>
        )}

        {day && (
          <>
            <header className="px-4 pt-6 pb-6 md:px-6 md:pt-8">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <DepartureDayHero day={day} showCount={!isLoading && !isError} />
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
                <ActionButton
                  type="button"
                  variant="outline"
                  onClick={retry}
                  disabled={isRetrying}
                  className="border-ink"
                >
                  {isRetrying ? (
                    <Loader2Icon aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
                  ) : (
                    <RotateCwIcon aria-hidden="true" />
                  )}
                  {t.retry}
                </ActionButton>
              </div>
            )}

            {!isLoading && !isError && day.reservations.length > 0 && (
              <div className="border-t border-line bg-paper/60 pt-4">
                <DepartureDayReservations day={day} />
              </div>
            )}

            {!isLoading && !isError && day.reservations.length === 0 && (
              <div className="flex items-start gap-4 border-t border-line px-4 py-10 md:px-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint text-forest">
                  <CalendarXIcon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{t.emptyTitle}</p>
                  <p className="mt-1 max-w-[60ch] text-[15px] text-muted-foreground">{t.empty}</p>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
