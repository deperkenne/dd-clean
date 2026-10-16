type StepItemProps = {
  index: number
  title: string
  description: string
}

export function StepItem({ index, title, description }: StepItemProps) {
  return (
    <div className="border-t-2 border-citron pt-4">
      <span className="font-mono text-[13px] font-medium text-citron">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className="mt-2 text-xl leading-tight font-semibold">{title}</h3>
      <p className="mt-2 text-[15px] text-paper/75">{description}</p>
    </div>
  )
}
