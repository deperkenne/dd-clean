import { cn } from '@/lib/utils'
import { OwnerMonogram } from '../owners/OwnerMonogram'
import type { AgentView } from './myAgents.types'

/** Monogramme et nom d'un agent ; un agent inactif est atténué. */
export function AgentIdentity({ agent }: { agent: AgentView }) {
  return (
    <div className="flex min-w-0 items-center gap-3.5">
      <OwnerMonogram initials={agent.initials} className={cn(!agent.active && 'bg-ink/40 text-paper')} />
      <p
        className={cn(
          'min-w-0 text-[16px] leading-snug font-semibold break-words',
          agent.active ? 'text-ink' : 'text-muted-foreground',
        )}
      >
        {agent.fullName}
      </p>
    </div>
  )
}
