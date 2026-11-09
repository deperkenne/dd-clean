import { BackLink } from '@/components/common/BackLink'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import { CreateAgentForm } from './CreateAgentForm'
import { createAgentContent } from './CreateAgentPage.data'
import { CreateAgentSuccess } from './CreateAgentSuccess'
import { useCreateAgent } from './useCreateAgent'

/** Page « Ajouter un agent de ménage » de l'espace client : la fiche, puis la confirmation. */
export function CreateAgentPage() {
  const t = useLocalized(createAgentContent)
  const agent = useCreateAgent()

  return (
    <div className="mx-auto max-w-[880px]">
      <BackLink to={customerPaths.home} label={t.backLabel} />
      {agent.created ? (
        <CreateAgentSuccess summary={agent.created} onStartOver={agent.startOver} />
      ) : (
        <CreateAgentForm agent={agent} />
      )}
    </div>
  )
}
