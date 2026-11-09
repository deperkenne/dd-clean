import { RotateCwIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { BackLink } from '@/components/common/BackLink'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { jobDetailContent } from './JobDetailPage.data'
import { JobDetailView } from './JobDetailView'
import { useJobDetail } from './useJobDetail'
import { useJobDetailBackLink } from './useJobDetailBackLink'

/** Fonctionnalité 2 — détail d'un job : /dashboard/secretary/jobs/:jobId */
export function JobDetailPage() {
  const t = useLocalized(jobDetailContent)
  const { jobId = '' } = useParams()
  const detail = useJobDetail(jobId)
  const back = useJobDetailBackLink()

  return (
    <>
      <BackLink to={back.to} label={t.back[back.target]} />

      {detail.status === 'loading' && (
        <div role="status" aria-label={t.loading} className="mt-6 grid gap-6">
          <Skeleton className="h-10 w-2/3 max-w-md" />
          <div className="grid gap-6 lg:grid-cols-2">
            {[0, 1, 2, 3].map((key) => (
              <Skeleton key={key} className="h-[220px] rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {detail.status === 'error' && (
        <div role="alert" className="mt-6 rounded-xl border border-line border-l-[3px] border-l-danger bg-white p-5">
          <p className="text-[15px] text-ink">{t.error}</p>
          <ActionButton variant="outline" className="mt-4 border-ink bg-transparent" onClick={detail.retry}>
            <RotateCwIcon aria-hidden="true" />
            {t.retry}
          </ActionButton>
        </div>
      )}

      {detail.status === 'notFound' && (
        <div className="mt-6 rounded-xl border border-line bg-white p-5">
          <h1 className="text-2xl font-semibold">{t.notFoundTitle}</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">{t.notFoundText}</p>
        </div>
      )}

      {detail.status === 'success' && <JobDetailView detail={detail.data} />}
    </>
  )
}
