import { MailIcon, PhoneIcon } from 'lucide-react'
import { ContactLink } from '@/components/common/ContactLink'
import { Eyebrow } from '@/components/common/Eyebrow'
import { InfoList } from '@/components/common/InfoList'
import { Panel } from '@/components/common/Panel'
import { Tag } from '@/components/common/Tag'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { toMailHref, toTelHref } from '@/lib/contact'
import { formatDuration, formatShortDay } from '@/lib/date'
import { JobLinkRow } from '../JobLinkRow'
import type { JobListItem } from '../jobListItem.types'
import {
  jobStatusLabels,
  jobStatusTones,
  reservationStatusLabels,
  reservationStatusTones,
  serviceTypeLabels,
} from '../jobLabels.data'
import { propertyDetailContent } from './PropertyDetailPage.data'
import type { PropertyDetail } from './propertyDetail.types'
import { ReservationRow } from './ReservationRow'

type PropertyDetailViewProps = {
  detail: PropertyDetail
  /** Adresse de cette fiche, pour que le détail d'un job y ramène. */
  backTo: string
}

/** Fiche d'un bien (lecture seule). */
export function PropertyDetailView({ detail, backTo }: PropertyDetailViewProps) {
  const { locale } = useLocale()
  const t = useLocalized(propertyDetailContent)
  const statusLabels = useLocalized(jobStatusLabels)
  const reservationLabels = useLocalized(reservationStatusLabels)
  const serviceLabels = useLocalized(serviceTypeLabels)
  const { property, owner, reservations, upcomingJobs, pastJobs } = detail
  const fullAddress = `${property.address}, ${property.postalCode} ${property.city}`

  const empty = (text: string) => <p className="px-4 py-4 text-[15px] text-muted-foreground md:px-5">{text}</p>
  const jobList = (jobs: JobListItem[]) => (
    <ul className="divide-y divide-line">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobLinkRow
            to={`/dashboard/secretary/jobs/${job.id}`}
            backTo={backTo}
            dayLabel={formatShortDay(job.scheduledDate, locale)}
            title={job.agentName ?? t.jobs.unassigned}
            detail={formatDuration(job.durationMinutes, locale)}
            statusLabel={statusLabels[job.status]}
            statusTone={jobStatusTones[job.status]}
          />
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <Eyebrow className="mt-4">{t.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-semibold tracking-[-0.01em] text-balance">
        {property.label}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-muted-foreground">
        <Tag>{serviceLabels[property.serviceType]}</Tag>
        <span>{fullAddress}</span>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <Panel title={t.info.title} titleId="property-info-title">
          <InfoList
            items={[
              { label: t.info.address, value: fullAddress },
              { label: t.info.smoobu, value: property.smoobuPropertyId ? t.info.smoobuYes : t.info.smoobuNo },
              { label: t.info.notes, value: property.notes ?? t.info.noNotes },
            ]}
          />
        </Panel>

        <Panel title={t.owner.title} titleId="property-owner-title">
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
            empty(t.owner.missing)
          )}
        </Panel>

        <Panel title={t.jobs.upcomingTitle} titleId="property-upcoming-title" meta={t.jobs.count(upcomingJobs.length)}>
          {upcomingJobs.length === 0 ? empty(t.jobs.upcomingEmpty) : jobList(upcomingJobs)}
        </Panel>

        <Panel
          title={t.reservations.title}
          titleId="property-reservations-title"
          meta={t.reservations.count(reservations.length)}
        >
          {reservations.length === 0 ? (
            empty(t.reservations.empty)
          ) : (
            <ul className="divide-y divide-line">
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  <ReservationRow
                    guestName={reservation.guestName}
                    stayLabel={`${formatShortDay(reservation.checkIn, locale)} → ${formatShortDay(reservation.checkOut, locale)}`}
                    statusLabel={reservationLabels[reservation.status]}
                    statusTone={reservationStatusTones[reservation.status]}
                    job={
                      reservation.cleaningJobId
                        ? {
                            to: `/dashboard/secretary/jobs/${reservation.cleaningJobId}`,
                            backTo,
                            label: t.reservations.linkedJob,
                          }
                        : null
                    }
                    noJobLabel={t.reservations.noJob}
                  />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title={t.jobs.pastTitle}
          titleId="property-past-title"
          meta={t.jobs.count(pastJobs.length)}
          className="lg:col-span-2"
        >
          {pastJobs.length === 0 ? empty(t.jobs.pastEmpty) : jobList(pastJobs)}
        </Panel>
      </div>
    </>
  )
}
