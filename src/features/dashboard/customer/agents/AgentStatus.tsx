import { StatusBadge } from '@/components/common/StatusBadge'
import { useLocalized } from '@/hooks/useLocale'
import { myAgentsContent } from './MyAgents.data'

/** Badge « Actif » / « Inactif » d'un agent. */
export function AgentStatus({ active }: { active: boolean }) {
  const t = useLocalized(myAgentsContent)
  return <StatusBadge tone={active ? 'success' : 'muted'}>{active ? t.active : t.inactive}</StatusBadge>
}
