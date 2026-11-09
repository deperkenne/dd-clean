import { useLocalized } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { OwnerContact } from '../owners/OwnerContact'
import { AgentIdentity } from './AgentIdentity'
import { AgentStatus } from './AgentStatus'
import { myAgentsContent } from './MyAgents.data'
import type { AgentView } from './myAgents.types'

const headCell =
  'px-4 py-3 text-left font-mono text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase first:pl-6 last:pr-6'
const bodyCell = 'px-4 py-5 align-middle first:pl-6 last:pr-6'

/** Les agents en tableau (grands écrans). */
export function AgentTable({ agents, caption }: { agents: AgentView[]; caption: string }) {
  const t = useLocalized(myAgentsContent)

  return (
    <table className="w-full table-fixed border-collapse text-[15px]">
      <caption className="sr-only">{caption}</caption>
      <thead className="border-b border-line bg-paper/70">
        <tr>
          <th scope="col" className={cn(headCell, 'w-20')}>{t.columns.position}</th>
          <th scope="col" className={cn(headCell, 'w-[38%]')}>{t.columns.agent}</th>
          <th scope="col" className={headCell}>{t.columns.contact}</th>
          <th scope="col" className={cn(headCell, 'w-36 text-right')}>{t.columns.status}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {agents.map((agent) => (
          <tr key={agent.id} className="group transition-colors hover:bg-mint/35">
            <td className={bodyCell}>
              <span className="font-heading text-2xl leading-none font-medium text-ink/25 tabular-nums transition-colors group-hover:text-forest">
                {agent.position}
              </span>
            </td>
            <td className={bodyCell}>
              <AgentIdentity agent={agent} />
            </td>
            <td className={bodyCell}>
              <OwnerContact owner={agent} />
            </td>
            <td className={cn(bodyCell, 'text-right')}>
              <AgentStatus active={agent.active} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
