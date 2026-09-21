import { ImagePlus } from 'lucide-react'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

// Real numbers arrive once the backend stores analyses.
const STATS = [
  { label: 'Analyses run', value: '0' },
  { label: 'Images uploaded', value: '0' },
  { label: 'Average processing time', value: '–' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = user.name.trim().split(' ')[0]

  return (
    <>
      <h1 className="headline text-3xl font-bold sm:text-4xl">Welcome back, {firstName}</h1>
      <p className="mt-2 text-slate">Here is what is happening in your workspace.</p>

      <dl className="mt-8 grid divide-y divide-line rounded-2xl border border-line bg-paper sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="p-5">
            <dt className="text-sm text-slate">{s.label}</dt>
            <dd className="mt-1 font-display text-3xl font-bold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 flex flex-col gap-5 rounded-2xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="font-display text-2xl font-semibold">Analyze a new image</h2>
          <p className="mt-1.5 max-w-md text-white/70">
            Upload a JPG, PNG or WebP and choose what the model should look for.
          </p>
        </div>
        <Button to="/analyze" variant="accent" size="lg" className="self-start sm:self-auto">
          Upload image
        </Button>
      </section>

      <section className="mt-10" aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="font-display text-xl font-semibold">
          Recent analyses
        </h2>
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-line px-6 py-14 text-center">
          <ImagePlus size={32} className="text-slate" aria-hidden="true" />
          <p className="mt-4 font-semibold">No analyses yet</p>
          <p className="mt-1 max-w-xs text-slate">Upload an image to run your first analysis. It will show up here.</p>
          <Button to="/analyze" variant="outline" className="mt-6">
            Upload image
          </Button>
        </div>
      </section>
    </>
  )
}