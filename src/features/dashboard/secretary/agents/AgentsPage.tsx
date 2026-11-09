import { RotateCwIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { Eyebrow } from '@/components/common/Eyebrow'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { toTelHref } from '@/lib/contact'
import { formatDayRange, formatDuration, formatShortDay } from '@/lib/date'
import { JobLinkRow } from '../JobLinkRow'
import { jobStatusLabels, jobStatusTones } from '../jobLabels.data'
import { WeekNavigator } from '../week/WeekNavigator'
import { AgentCard } from './AgentCard'
import { agentsContent } from './AgentsPage.data'
import { useAgentsWorkload } from './useAgentsWorkload'

/** Fonctionnalité 6 — agents et charge de la semaine : /dashboard/secretary/agents?week=AAAA-MM-JJ */
export function AgentsPage() {
  const { locale } = useLocale()
  const t = useLocalized(agentsContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const workload = useAgentsWorkload()

  return (
    <>
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[clamp(1.875rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em]">
            {t.title}
          </h1>
          <p className="mt-1 text-[15px] text-muted-foreground" aria-live="polite">
            {formatDayRange(workload.weekStart, workload.weekEnd, locale)}
            {workload.status === 'success' && ` · ${t.agentsCount(workload.data.length)}`}
          </p>
        </div>
        <WeekNavigator
          isCurrentWeek={workload.isCurrentWeek}
          onPrevious={workload.previousWeek}
          onCurrent={workload.currentWeek}
          onNext={workload.nextWeek}
        />
      </div>

      <div className="mt-6">
        {workload.status === 'loading' && (
          <div role="status" aria-label={t.loading} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((key) => (
              <Skeleton key={key} className="h-[300px] rounded-xl" />
            ))}
          </div>
        )}

        {workload.status === 'error' && (
          <div role="alert" className="rounded-xl border border-line border-l-[3px] border-l-danger bg-white p-5">
            <p className="text-[15px] text-ink">{t.error}</p>
            <ActionButton variant="outline" className="mt-4 border-ink bg-transparent" onClick={workload.retry}>
              <RotateCwIcon aria-hidden="true" />
              {t.retry}
            </ActionButton>
          </div>
        )}

        {workload.status === 'success' && workload.data.length === 0 && (
          <p className="rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-muted-foreground">{t.empty}</p>
        )}

        {workload.status === 'success' && workload.data.length > 0 && (
          <ul className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
            {workload.data.map((agent) => (
              <li key={agent.id} className="min-w-0">
                <AgentCard
                  name={agent.fullName}
                  phone={agent.phone}
                  phoneHref={toTelHref(agent.phone)}
                  workloadLabel={t.workloadLabel}
                  stats={[
                    { label: t.jobsLabel, value: String(agent.jobCount) },
                    {
                      label: t.timeLabel,
                      value: agent.totalMinutes > 0 ? formatDuration(agent.totalMinutes, locale) : '—',
                    },
                  ]}
                >
                  {agent.jobs.length === 0 ? (
                    <p className="px-4 py-4 text-[14px] text-muted-foreground md:px-5">{t.noJobs}</p>
                  ) : (
                    <ul aria-label={`${t.weekJobsLabel} — ${agent.fullName}`} className="divide-y divide-line">
                      {agent.jobs.map((job) => (
                        <li key={job.id}>
                          <JobLinkRow
                            to={`/dashboard/secretary/jobs/${job.id}`}
                            backTo={workload.backTo}
                            dayLabel={formatShortDay(job.scheduledDate, locale)}
                            title={job.propertyLabel}
                            detail={formatDuration(job.durationMinutes, locale)}
                            statusLabel={statusLabels[job.status]}
                            statusTone={jobStatusTones[job.status]}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </AgentCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
