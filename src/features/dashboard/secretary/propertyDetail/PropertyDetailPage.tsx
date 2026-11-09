import { RotateCwIcon } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { BackLink } from '@/components/common/BackLink'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalized } from '@/hooks/useLocale'
import { propertyDetailContent } from './PropertyDetailPage.data'
import { PropertyDetailView } from './PropertyDetailView'
import { usePropertyDetail } from './usePropertyDetail'

/** Fonctionnalité 7 — fiche d'un bien : /dashboard/secretary/properties/:propertyId */
export function PropertyDetailPage() {
  const t = useLocalized(propertyDetailContent)
  const { propertyId = '' } = useParams()
  const { pathname } = useLocation()
  const detail = usePropertyDetail(propertyId)

  return (
    <>
      <BackLink to="/dashboard/secretary" label={t.back} />

      {detail.status === 'loading' && (
        <div role="status" aria-label={t.loading} className="mt-6 grid gap-6">
          <Skeleton className="h-10 w-2/3 max-w-md" />
          <div className="grid gap-6 lg:grid-cols-2">
            {[0, 1, 2, 3].map((key) => (
              <Skeleton key={key} className="h-[200px] rounded-xl" />
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

      {detail.status === 'success' && <PropertyDetailView detail={detail.data} backTo={pathname} />}
    </>
  )
}
