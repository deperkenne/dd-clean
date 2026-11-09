import { CheckIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ActionButton } from '@/components/common/ActionButton'
import { BrandMark } from '@/components/common/BrandMark'
import { Eyebrow } from '@/components/common/Eyebrow'
import { useLocalized } from '@/hooks/useLocale'
import { customerPaths } from '../customerPaths'
import type { CreatedOwnerSummary } from './createOwner.types'
import { createOwnerContent } from './CreateOwnerPage.data'

type CreateOwnerSuccessProps = {
  summary: CreatedOwnerSummary
  onStartOver: () => void
}

/** Confirmation après création : ce qui a été enregistré, puis la suite. */
export function CreateOwnerSuccess({ summary, onStartOver }: CreateOwnerSuccessProps) {
  const t = useLocalized(createOwnerContent)

  return (
    <section
      role="status"
      aria-labelledby="owner-created-title"
      className="relative isolate mt-4 overflow-hidden rounded-2xl bg-ink px-5 py-10 text-paper motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500 md:px-12 md:py-14"
    >
      <BrandMark className="-top-[0.2em] -right-[0.05em] text-[clamp(14rem,42vw,28rem)] text-forest/45" />
      <span className="grid size-12 place-items-center rounded-full bg-citron text-ink">
        <CheckIcon aria-hidden="true" className="size-6" />
      </span>
      <Eyebrow tone="citron" className="mt-6">
        {t.success.eyebrow}
      </Eyebrow>
      <h1
        id="owner-created-title"
        className="mt-4 max-w-[20ch] text-[clamp(2rem,5vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.02em] break-words text-balance"
      >
        {t.success.title(summary.name)}
      </h1>
      <p className="mt-4 font-mono text-[13px] tracking-[0.08em] break-words text-paper/70 uppercase">
        {t.success.details(summary)}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ActionButton
          type="button"
          size="lg"
          onClick={onStartOver}
          className="bg-citron text-ink hover:bg-citron/85 focus-visible:ring-citron/50"
        >
          <PlusIcon aria-hidden="true" />
          {t.success.again}
        </ActionButton>
        <ActionButton
          asChild
          size="lg"
          variant="outline"
          className="border-paper/30 bg-transparent text-paper hover:bg-paper/10 hover:text-paper"
        >
          <Link to={customerPaths.home}>{t.success.back}</Link>
        </ActionButton>
      </div>
    </section>
  )
}
