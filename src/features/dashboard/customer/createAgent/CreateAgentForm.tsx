import { FormDocumentHeader } from '@/components/common/FormDocumentHeader'
import { FormSection } from '@/components/common/FormSection'
import { FormSubmitBar } from '@/components/common/FormSubmitBar'
import { AGENT_LIMITS } from '@/features/agents/agent.schema'
import { useLocalized } from '@/hooks/useLocale'
import { AgentField } from './AgentField'
import { createAgentContent } from './CreateAgentPage.data'
import type { useCreateAgent } from './useCreateAgent'

/** La fiche agent : en-tête D&D Clean, identité, coordonnées, barre d'envoi. */
export function CreateAgentForm({ agent }: { agent: ReturnType<typeof useCreateAgent> }) {
  const t = useLocalized(createAgentContent)
  const { form, submit, isPending, failure } = agent

  return (
    <form onSubmit={submit} noValidate aria-labelledby="create-agent-title" className="mt-4">
      <div className="min-w-0 overflow-clip rounded-2xl border border-line bg-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
        <FormDocumentHeader
          titleId="create-agent-title"
          logoLabel={t.logoLabel}
          documentLabel={t.documentLabel}
          title={t.title}
          lead={t.lead}
        />

        <FormSection index={1} title={t.identity.title} titleId="agent-identity-title" description={t.identity.description}>
          <fieldset disabled={isPending} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <legend className="sr-only">{t.identity.title}</legend>
            <AgentField
              form={form}
              name="firstName"
              label={t.identity.firstName}
              maxLength={AGENT_LIMITS.name}
              autoComplete="off"
            />
            <AgentField
              form={form}
              name="lastName"
              label={t.identity.lastName}
              maxLength={AGENT_LIMITS.name}
              autoComplete="off"
            />
          </fieldset>
        </FormSection>

        <FormSection index={2} title={t.contact.title} titleId="agent-contact-title" description={t.contact.description}>
          <fieldset disabled={isPending} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <legend className="sr-only">{t.contact.title}</legend>
            <AgentField
              form={form}
              name="email"
              type="email"
              inputMode="email"
              label={t.contact.email}
              hint={t.contact.emailHint}
              maxLength={AGENT_LIMITS.email}
              autoComplete="off"
            />
            <AgentField
              form={form}
              name="phone"
              type="tel"
              inputMode="tel"
              label={t.contact.phone}
              hint={t.contact.phoneHint}
              optional
              maxLength={AGENT_LIMITS.phone}
              autoComplete="off"
            />
          </fieldset>
        </FormSection>

        {failure && (
          <p
            role="alert"
            className="mx-4 mb-6 rounded-md border-l-[3px] border-danger bg-danger/5 px-4 py-3 text-[15px] text-ink md:mx-8"
          >
            {t.failures[failure]}
          </p>
        )}

        <FormSubmitBar
          isPending={isPending}
          secureNote={t.secureNote}
          submitLabel={t.submit}
          submittingLabel={t.submitting}
        />
      </div>
    </form>
  )
}
