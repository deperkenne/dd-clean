import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { ActionButton } from '@/components/common/ActionButton'
import { useLocalized } from '@/hooks/useLocale'
import { weekNavigatorContent } from './WeekNavigator.data'

type WeekNavigatorProps = {
  isCurrentWeek: boolean
  onPrevious: () => void
  onCurrent: () => void
  onNext: () => void
}

/** Boutons ‹ · Cette semaine · › (« Cette semaine » grisé si on y est déjà). */
export function WeekNavigator({ isCurrentWeek, onPrevious, onCurrent, onNext }: WeekNavigatorProps) {
  const t = useLocalized(weekNavigatorContent)

  return (
    <nav aria-label={t.label} className="flex items-center gap-2">
      <ActionButton variant="outline" size="icon" className="border-ink bg-transparent" onClick={onPrevious} aria-label={t.previous}>
        <ChevronLeftIcon aria-hidden="true" />
      </ActionButton>
      <ActionButton variant="outline" className="border-ink bg-transparent" onClick={onCurrent} disabled={isCurrentWeek}>
        {t.current}
      </ActionButton>
      <ActionButton variant="outline" size="icon" className="border-ink bg-transparent" onClick={onNext} aria-label={t.next}>
        <ChevronRightIcon aria-hidden="true" />
      </ActionButton>
    </nav>
  )
}
