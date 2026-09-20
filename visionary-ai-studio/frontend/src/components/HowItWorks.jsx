const STEPS = [
  { title: 'Upload an image', text: 'Drag a JPG, PNG or WebP onto the dropzone.' },
  { title: 'AI processes it', text: 'The image is checked, then analyzed by the model you pick.' },
  { title: 'View the results', text: 'See boxes, labels and confidence scores over your image.' },
  { title: 'Save or download', text: 'Keep the analysis in your history or download it as a report.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="headline max-w-lg text-3xl font-bold sm:text-4xl">
          From upload to result in four steps
        </h2>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          <div aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-line md:block" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-[16rem] leading-relaxed text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
