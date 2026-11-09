import { Skeleton } from '@/components/ui/skeleton'

/** Silhouette de la vue d'ensemble pendant le chargement des données. */
export function OverviewSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {[0, 1, 2, 3].map((key) => (
          <Skeleton key={key} className="h-[124px] rounded-xl md:h-[140px]" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Skeleton className="h-[420px] rounded-xl" />
        <Skeleton className="h-[420px] rounded-xl" />
      </div>
    </div>
  )
}
