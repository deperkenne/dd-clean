import { OwnerContact } from '../owners/OwnerContact'
import { AgentIdentity } from './AgentIdentity'
import { AgentStatus } from './AgentStatus'
import type { AgentView } from './myAgents.types'

/** Un agent en carte (petits écrans). */
export function AgentCard({ agent }: { agent: AgentView }) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-line bg-white p-4">
      <span
        aria-hidden="true"
        className="absolute top-3 right-4 font-heading text-3xl leading-none font-medium text-ink/10 tabular-nums"
      >
        {agent.position}
      </span>
      <div className="pr-12">
        <AgentIdentity agent={agent} />
      </div>
      <div className="mt-3 border-t border-line pt-1">
        <OwnerContact owner={agent} />
      </div>
      <div className="mt-1 border-t border-line pt-3">
        <AgentStatus active={agent.active} />
      </div>
    </article>
  )
}
