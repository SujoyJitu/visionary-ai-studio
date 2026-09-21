import Button from './Button.jsx'
import DetectionDemo from './DetectionDemo.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Hero() {
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="grid-paper pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div>
          <h1 className="headline text-[2.75rem] font-bold leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
            Turn every image into meaningful insights.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            Upload your image and let AI discover objects, understand scenes, and reveal hidden details.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button to={user ? '/analyze' : '/register'} size="lg">Start analyzing</Button>
            <Button href="#features" variant="outline" size="lg">Explore features</Button>
          </div>
        </div>

        <DetectionDemo />
      </div>
    </section>
  )
}