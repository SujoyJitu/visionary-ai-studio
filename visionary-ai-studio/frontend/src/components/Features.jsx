import { FileText, Images, Layers, MessageSquareText, ScanSearch, Tags } from 'lucide-react'

const FEATURES = [
  {
    icon: Tags,
    name: 'Image classification',
    text: 'Tells you what the photo shows and how confident the model is.',
    status: 'mvp',
  },
  {
    icon: ScanSearch,
    name: 'Object detection',
    text: 'Finds each object in the image and draws a labeled box around it.',
    status: 'mvp',
  },
  {
    icon: MessageSquareText,
    name: 'AI captioning',
    text: 'Writes a one-sentence description of the scene.',
    status: 'planned',
  },
  {
    icon: Layers,
    name: 'Background segmentation',
    text: 'Separates the subject from the background and exports a transparent PNG.',
    status: 'planned',
  },
  {
    icon: Images,
    name: 'Image similarity',
    text: 'Finds photos in your library that look like the one you uploaded.',
    status: 'planned',
  },
  {
    icon: FileText,
    name: 'Smart reports',
    text: 'Saves each result with a confidence summary you can download.',
    status: 'planned',
  },
]

function Status({ status }) {
  return status === 'mvp' ? (
    <span className="rounded-full bg-cobalt/10 px-2.5 py-1 text-xs font-semibold text-cobalt-deep">
      In first release
    </span>
  ) : (
    <span className="rounded-full px-2.5 py-1 text-xs font-semibold text-slate ring-1 ring-line">
      Planned
    </span>
  )
}

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="headline text-3xl font-bold sm:text-4xl">Six ways to read an image</h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate">
            Classification and object detection ship first. The other four are planned and will appear here as they are built.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {FEATURES.map(({ icon: Icon, name, text, status }) => (
            <li key={name} className="flex gap-4 py-6 sm:gap-5">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-paper ring-1 ring-line ${
                  status === 'mvp' ? 'text-cobalt' : 'text-slate'
                }`}
              >
                <Icon size={22} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h3 className="font-display text-xl font-semibold">{name}</h3>
                  <Status status={status} />
                </div>
                <p className="mt-1.5 max-w-lg leading-relaxed text-slate">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
