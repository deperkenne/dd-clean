import { ChevronRightIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactLink } from '@/components/common/ContactLink'
import { Eyebrow } from '@/components/common/Eyebrow'
import { InfoList } from '@/components/common/InfoList'
import { Panel } from '@/components/common/Panel'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Tag } from '@/components/common/Tag'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { toMailHref, toTelHref } from '@/lib/contact'
import { formatDuration, formatLongDay, formatShortDay } from '@/lib/date'
import {
  jobStatusLabels,
  jobStatusTones,
  reservationStatusLabels,
  reservationStatusTones,
  serviceTypeLabels,
} from '../jobLabels.data'
import { AssignAgentForm } from '../assignAgent/AssignAgentForm'
import { JobStatusTracker } from '../jobStatus/JobStatusTracker'
import { jobDetailContent } from './JobDetailPage.data'
import type { JobDetail } from './jobDetail.types'

/** Affichage du détail d'un job (lecture seule). */
export function JobDetailView({ detail }: { detail: JobDetail }) {
  const { locale } = useLocale()
  const t = useLocalized(jobDetailContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const reservationLabels = useLocalized(reservationStatusLabels)
  const serviceLabels = useLocalized(serviceTypeLabels)
  const { job, property, owner, reservation, agent } = detail

  const missing = (text: string) => <p className="px-4 py-4 text-[15px] text-muted-foreground md:px-5">{text}</p>

  return (
    <>
      <Eyebrow className="mt-4">{t.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em] text-balance">
        {property?.label ?? job.propertyId}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-muted-foreground">
        <StatusBadge tone={jobStatusTones[job.status]}>{statusLabels[job.status]}</StatusBadge>
        <span className="first-letter:uppercase">{formatLongDay(job.scheduledDate, locale)}</span>
        {property && <Tag>{serviceLabels[property.serviceType]}</Tag>}
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <JobStatusTracker job={job} className="lg:col-span-2" />

        <Panel title={t.intervention.title} titleId="job-intervention-title">
          <InfoList
            items={[
              { label: t.intervention.duration, value: formatDuration(job.estimatedDurationMinutes, locale) },
              {
                label: t.intervention.agent,
                value: agent ? (
                  <span className="flex flex-col">
                    <span className="font-medium">{agent.fullName}</span>
                    <ContactLink href={toTelHref(agent.phone)} icon={PhoneIcon}>
                      {agent.phone}
                    </ContactLink>
                  </span>
                ) : (
                  <span className="font-medium">{t.intervention.unassigned}</span>
                ),
              },
            ]}
          />
          <AssignAgentForm job={job} />
        </Panel>

        <Panel title={t.reservation.title} titleId="job-reservation-title">
          {reservation ? (
            <InfoList
              items={[
                { label: t.reservation.guest, value: reservation.guestName },
                {
                  label: t.reservation.stay,
                  value: `${formatShortDay(reservation.checkIn, locale)} → ${formatShortDay(reservation.checkOut, locale)}`,
                },
                {
                  label: t.reservation.status,
                  value: (
                    <StatusBadge tone={reservationStatusTones[reservation.status]}>
                      {reservationLabels[reservation.status]}
                    </StatusBadge>
                  ),
                },
              ]}
            />
          ) : (
            missing(t.reservation.none)
          )}
        </Panel>

        <Panel title={t.property.title} titleId="job-property-title">
          {property ? (
            <>
              <InfoList
                items={[
                  {
                    label: t.property.address,
                    value: `${property.address}, ${property.postalCode} ${property.city}`,
                  },
                  { label: t.property.service, value: serviceLabels[property.serviceType] },
                  {
                    label: t.property.smoobu,
                    value: property.smoobuPropertyId ? t.property.smoobuYes : t.property.smoobuNo,
                  },
                  ...(property.notes ? [{ label: t.property.notes, value: property.notes }] : []),
                ]}
              />
              <Link
                to={`/dashboard/secretary/properties/${property.id}`}
                className="flex min-h-11 items-center gap-1 border-t border-line px-4 text-[14px] font-medium text-forest outline-none hover:bg-paper focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:px-5"
              >
                {t.property.viewProperty}
                <ChevronRightIcon aria-hidden="true" className="size-4" />
              </Link>
            </>
          ) : (
            missing(t.property.missing)
          )}
        </Panel>

        <Panel title={t.owner.title} titleId="job-owner-title">
          {owner ? (
            <InfoList
              items={[
                { label: t.owner.name, value: owner.fullName },
                {
                  label: t.owner.phone,
                  value: (
                    <ContactLink href={toTelHref(owner.phone)} icon={PhoneIcon}>
                      {owner.phone}
                    </ContactLink>
                  ),
                },
                {
                  label: t.owner.email,
                  value: (
                    <ContactLink href={toMailHref(owner.email)} icon={MailIcon}>
                      {owner.email}
                    </ContactLink>
                  ),
                },
              ]}
            />
          ) : (
            missing(t.owner.missing)
          )}
        </Panel>
      </div>
    </>
  )
}
