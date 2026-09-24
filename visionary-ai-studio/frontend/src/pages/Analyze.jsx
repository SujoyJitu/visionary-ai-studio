import { useEffect, useRef, useState } from 'react'
import { MessageSquareText, ScanSearch, Tags } from 'lucide-react'
import Dropzone from '../components/Dropzone.jsx'
import ImagePreview from '../components/ImagePreview.jsx'
import Button from '../components/Button.jsx'

const MODES = [
  { id: 'detect', label: 'Object detection', icon: ScanSearch, description: 'Find each object and draw a box around it.' },
  { id: 'classify', label: 'Classification', icon: Tags, description: 'Say what the whole image shows.' },
  { id: 'caption', label: 'Caption', icon: MessageSquareText, description: 'Write a one-sentence description.' },
]

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [mode, setMode] = useState('detect')
  const urlRef = useRef(null)

  function handleFileSelected(selected) {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const url = URL.createObjectURL(selected)
    urlRef.current = url
    setFile(selected)
    setPreviewUrl(url)
  }

  function handleReset() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setFile(null)
    setPreviewUrl(null)
  }

  // Release the object URL if the person leaves the page without resetting.
  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  return (
    <>
      <h1 className="headline text-3xl font-bold sm:text-4xl">Analyze an image</h1>
      <p className="mt-2 max-w-md text-slate">Upload a photo, choose what to look for, then run the analysis.</p>

      <div className="mt-8">
        {file ? (
          <ImagePreview file={file} previewUrl={previewUrl} onReset={handleReset} />
        ) : (
          <Dropzone onFileSelected={handleFileSelected} />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold">Analysis type</h2>
        <div role="group" aria-label="Analysis type" className="mt-3 grid gap-3 sm:grid-cols-3">
          {MODES.map(({ id, label, icon: Icon, description }) => {
            const active = mode === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  active ? 'border-cobalt bg-cobalt/5' : 'border-line hover:border-ink/30'
                }`}
              >
                <Icon size={20} className={active ? 'text-cobalt' : 'text-slate'} aria-hidden="true" />
                <p className="mt-2 font-semibold">{label}</p>
                <p className="mt-0.5 text-sm text-slate">{description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <Button size="lg" className="mt-8" disabled={!file}>
        Run analysis
      </Button>
      {!file && <p className="mt-2 text-sm text-slate">Upload an image first.</p>}
    </>
  )
}