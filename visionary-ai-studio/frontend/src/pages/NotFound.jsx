import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <h1 className="headline text-4xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-lg text-slate">
          The page you are looking for does not exist or has moved.
        </p>
        <Button to="/" variant="outline" className="mt-8">
          Back to home
        </Button>
      </main>
      <Footer />
    </>
  )
}