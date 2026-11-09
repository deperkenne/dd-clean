import { BrandMark } from '@/components/common/BrandMark'
import { useLocalized } from '@/hooks/useLocale'
import { createOwnerContent } from './CreateOwnerPage.data'
import { useDraftSummary } from './useDraftSummary'

/** Carte sombre qui résume la fiche pendant la saisie. */
export function DraftSummary() {
  const t = useLocalized(createOwnerContent)
  const draft = useDraftSummary()

  return (
    <section
      aria-labelledby="owner-draft-title"
      className="relative isolate overflow-hidden rounded-2xl bg-ink p-5 text-paper md:p-6"
    >
      <BrandMark className="-right-[0.08em] -bottom-[0.35em] text-[12rem] text-forest/40" />
      <h2
        id="owner-draft-title"
        className="font-mono text-[11px] font-medium tracking-[0.14em] text-citron uppercase"
      >
        {t.summary.title}
      </h2>
      <p className="mt-4 font-heading text-2xl leading-tight font-semibold break-words">
        {draft.name || t.summary.ownerPlaceholder}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-paper/15">
        <div className="bg-ink p-4">
          <dt className="font-mono text-[11px] tracking-[0.1em] text-paper/60 uppercase">{t.summary.properties}</dt>
          <dd className="mt-1 font-heading text-4xl leading-none font-semibold tabular-nums">{draft.propertyCount}</dd>
        </div>
        <div className="bg-ink p-4">
          <dt className="font-mono text-[11px] tracking-[0.1em] text-paper/60 uppercase">{t.summary.rooms}</dt>
          <dd className="mt-1 font-heading text-4xl leading-none font-semibold tabular-nums">{draft.roomCount}</dd>
        </div>
      </dl>
    </section>
  )
}
