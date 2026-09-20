import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'

// Temporary page for routes we haven't built yet (login, register, ...).
export default function ComingNext({ title }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <h1 className="headline text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-md text-lg text-slate">
          This page is the next step on the roadmap. The landing page is done, so authentication comes next.
        </p>
        <Button to="/" variant="outline" className="mt-8">
          Back to home
        </Button>
      </main>
      <Footer />
    </>
  )
}
