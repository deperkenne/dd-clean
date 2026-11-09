import { RotateCwIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Panel } from '@/components/common/Panel'
import { StatTile } from '@/components/common/StatTile'
import { StatusDot } from '@/components/common/StatusDot'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { formatDuration, formatLongDay, formatShortDay } from '@/lib/date'
import { jobStatusLabels, jobStatusTones, serviceTypeLabels } from '../jobLabels.data'
import { overviewContent, statOrder, statTones } from './Overview.data'
import { OverviewSkeleton } from './OverviewSkeleton'
import { UPCOMING_WINDOW_DAYS } from './overview.selectors'
import { PropertyRow } from './PropertyRow'
import { UpcomingJobRow } from './UpcomingJobRow'
import { useSecretaryOverview } from './useSecretaryOverview'

/** Fonctionnalité 1 — vue d'ensemble : chiffres clés, jobs à venir, biens. */
export function Overview() {
  const { locale } = useLocale()
  const t = useLocalized(overviewContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const serviceLabels = useLocalized(serviceTypeLabels)
  const overview = useSecretaryOverview()

  if (overview.status === 'loading') return <OverviewSkeleton label={t.loading} />

  if (overview.status === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-line border-l-[3px] border-l-danger bg-white p-5">
        <p className="text-[15px] text-ink">{t.error}</p>
        <ActionButton variant="outline" className="mt-4 border-ink bg-transparent" onClick={overview.retry}>
          <RotateCwIcon aria-hidden="true" />
          {t.retry}
        </ActionButton>
      </div>
    )
  }

  const { data } = overview

  return (
    <div className="grid gap-6">
      <p className="text-[15px] text-muted-foreground first-letter:uppercase">
        {t.todayPrefix} {formatLongDay(data.today, locale)}
      </p>

      <section aria-label={t.statsLabel}>
        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {statOrder.map((key) => (
            <li key={key} className="min-w-0">
              <StatTile
                label={t.stats[key].label}
                hint={t.stats[key].hint}
                value={data.stats[key]}
                indicator={statTones[key] && <StatusDot tone={statTones[key]} />}
              />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel
          title={t.upcomingTitle}
          titleId="upcoming-jobs-title"
          meta={t.upcomingMeta(UPCOMING_WINDOW_DAYS)}
        >
          {data.upcomingJobs.length === 0 ? (
            <p className="px-4 py-8 text-center text-[15px] text-muted-foreground md:px-5">{t.upcomingEmpty}</p>
          ) : (
            <ul className="divide-y divide-line">
              {data.upcomingJobs.map((job) => (
                <li key={job.id}>
                  <UpcomingJobRow
                    to={`/dashboard/secretary/jobs/${job.id}`}
                    dayLabel={formatShortDay(job.scheduledDate, locale)}
                    propertyLabel={job.propertyLabel}
                    propertyCity={job.propertyCity}
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
            </ul>
          )}
        </Panel>

        <Panel title={t.propertiesTitle} titleId="properties-title" meta={t.propertiesMeta(data.properties.length)}>
          <ul className="divide-y divide-line">
            {data.properties.map((property) => (
              <li key={property.id}>
                <PropertyRow
                  to={`/dashboard/secretary/properties/${property.id}`}
                  label={property.label}
                  address={property.address}
                  city={property.city}
                  serviceLabel={serviceLabels[property.serviceType]}
                  nextJobTitle={t.nextJob}
                  nextJobValue={property.nextJobDate ? formatShortDay(property.nextJobDate, locale) : t.noJob}
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
