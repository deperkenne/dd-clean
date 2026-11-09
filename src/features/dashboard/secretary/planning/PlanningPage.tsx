import { RotateCwIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { formatDayMonth, formatDayRange, formatDuration, formatWeekday } from '@/lib/date'
import { jobStatusLabels, jobStatusTones, serviceTypeLabels } from '../jobLabels.data'
import { WeekNavigator } from '../week/WeekNavigator'
import { PlanningDayColumn } from './PlanningDayColumn'
import { PlanningJobCard } from './PlanningJobCard'
import { planningContent } from './PlanningPage.data'
import { usePlanningWeek } from './usePlanningWeek'

/** Fonctionnalité 3 — planning de la semaine : /dashboard/secretary/planning?week=AAAA-MM-JJ */
export function PlanningPage() {
  const { locale } = useLocale()
  const t = useLocalized(planningContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const serviceLabels = useLocalized(serviceTypeLabels)
  const planning = usePlanningWeek()

  return (
    <>
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[clamp(1.875rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em]">
            {t.title}
          </h1>
          <p className="mt-1 text-[15px] text-muted-foreground" aria-live="polite">
            {formatDayRange(planning.weekStart, planning.weekEnd, locale)}
            {planning.status === 'success' && ` · ${t.jobsCount(planning.data.totalJobs)}`}
          </p>
        </div>

        <WeekNavigator
          isCurrentWeek={planning.isCurrentWeek}
          onPrevious={planning.previousWeek}
          onCurrent={planning.currentWeek}
          onNext={planning.nextWeek}
        />
      </div>

      <div className="mt-6">
        {planning.status === 'loading' && (
          <div role="status" aria-label={t.loading} className="grid gap-3 lg:grid-cols-7">
            {Array.from({ length: 7 }, (_, key) => (
              <Skeleton key={key} className="h-24 rounded-xl lg:h-[360px]" />
            ))}
          </div>
        )}

        {planning.status === 'error' && (
          <div role="alert" className="rounded-xl border border-line border-l-[3px] border-l-danger bg-white p-5">
            <p className="text-[15px] text-ink">{t.error}</p>
            <ActionButton variant="outline" className="mt-4 border-ink bg-transparent" onClick={planning.retry}>
              <RotateCwIcon aria-hidden="true" />
              {t.retry}
            </ActionButton>
          </div>
        )}

        {planning.status === 'success' && (
          <>
            {planning.data.totalJobs === 0 && (
              <p className="mb-4 rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-muted-foreground">
                {t.emptyWeek}
              </p>
            )}
            <div className="grid gap-3 lg:grid-cols-7 lg:gap-2 xl:gap-3">
              {planning.data.days.map((day) => (
                <PlanningDayColumn
                  key={day.date}
                  weekday={formatWeekday(day.date, locale)}
                  dayMonth={formatDayMonth(day.date, locale)}
                  isToday={day.isToday}
                  todayLabel={t.today}
                  countLabel={day.jobs.length > 0 ? t.jobsCount(day.jobs.length) : ''}
                  emptyLabel={t.emptyDay}
                  isEmpty={day.jobs.length === 0}
                >
                  {day.jobs.map((job) => (
                    <li key={job.id}>
                      <PlanningJobCard
                        to={`/dashboard/secretary/jobs/${job.id}`}
                        backTo={planning.backTo}
                        propertyLabel={job.propertyLabel}
                        serviceLabel={job.serviceType ? serviceLabels[job.serviceType] : null}
                        durationLabel={formatDuration(job.durationMinutes, locale)}
                        durationTitle={t.durationLabel}
                        agentName={job.agentName}
                        agentTitle={t.agentLabel}
                        unassignedLabel={t.unassigned}
                        statusLabel={statusLabels[job.status]}
                        statusTone={jobStatusTones[job.status]}
                      />
                    </li>
                  ))}
                </PlanningDayColumn>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
