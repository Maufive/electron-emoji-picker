interface Props {
  title: string
  errorMessage?: string
}

export const GridTemplate: React.FC<Props> = ({
  children,
  title,
  errorMessage
}) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    {errorMessage && (
      <h2 className="text-2xl font-bold text-gray-200 w-full">
        {errorMessage}
      </h2>
    )}
    <div className="grid grid-cols-6 gap-4">{children}</div>
  </div>
)

export default GridTemplate
