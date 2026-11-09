import { NativeSelectOption } from '@/components/ui/native-select'
import { useLocale, useLocalized } from '@/hooks/useLocale'
import { formatDuration } from '@/lib/date'
import { agentOptionsContent } from './AgentOptions.data'
import type { AgentOption } from './agentOptions.types'

/** Options d'un <select> d'agent : « Aucun agent », puis chaque agent avec sa charge du jour. */
export function AgentOptions({ options }: { options: AgentOption[] }) {
  const { locale } = useLocale()
  const t = useLocalized(agentOptionsContent)

  return (
    <>
      <NativeSelectOption value="">{t.none}</NativeSelectOption>
      {options.map((option) => (
        <NativeSelectOption key={option.id} value={option.id}>
          {option.name} ·{' '}
          {option.jobsThatDay === 0
            ? t.freeThatDay
            : t.loadThatDay(option.jobsThatDay, formatDuration(option.minutesThatDay, locale))}
        </NativeSelectOption>
      ))}
    </>
  )
}
