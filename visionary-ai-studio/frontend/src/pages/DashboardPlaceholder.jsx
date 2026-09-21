// Stand-in for dashboard pages we build in later steps (Analyze, History, Settings).
export default function DashboardPlaceholder({ title, text }) {
  return (
    <>
      <h1 className="headline text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-md text-slate">{text}</p>
    </>
  )
}