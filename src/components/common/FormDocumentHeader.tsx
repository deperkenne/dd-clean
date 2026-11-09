import { Logo } from '@/components/common/Logo'
import { company } from '@/lib/company.data'

type FormDocumentHeaderProps = {
  /** Identifiant du titre, pour `aria-labelledby` du formulaire. */
  titleId: string
  logoLabel: string
  /** Type de document, ex. « Fiche propriétaire ». */
  documentLabel: string
  title: string
  lead: string
}

/** En-tête d'un formulaire « document » : logo et nom de D&D Clean, type de document, titre et chapeau. */
export function FormDocumentHeader({ titleId, logoLabel, documentLabel, title, lead }: FormDocumentHeaderProps) {
  return (
    <header className="px-4 pt-6 pb-8 md:px-8 md:pt-8 md:pb-10">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <Logo href="/" label={logoLabel} />
        <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          {company.name} · {company.address.city}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-0.5 flex-1 bg-ink" aria-hidden="true" />
        <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-forest uppercase">
          {documentLabel}
        </span>
      </div>
      <h1
        id={titleId}
        className="mt-8 text-[clamp(2rem,5vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.02em] text-balance"
      >
        {title}
      </h1>
      <p className="mt-4 max-w-[58ch] text-[15px] text-muted-foreground md:text-lg">{lead}</p>
    </header>
  )
}
