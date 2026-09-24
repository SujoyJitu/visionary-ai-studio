import { useCallback, useRef, useState } from 'react'
import { AlertCircle, ImagePlus, UploadCloud } from 'lucide-react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 10
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

function validateFile(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Only JPG, PNG or WebP images are supported.'
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `File is too large. Max size is ${MAX_SIZE_MB} MB.`
  }
  return null
}

// Calls onFileSelected(file) once a valid image is chosen (click or drag-and-drop).
export default function Dropzone({ onFileSelected }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0]
      if (!file) return
      const problem = validateFile(file)
      if (problem) {
        setError(problem)
        return
      }
      setError('')
      onFileSelected(file)
    },
    [onFileSelected],
  )

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex w-full flex-col items-center rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
          dragging ? 'border-cobalt bg-cobalt/5' : 'border-line hover:border-ink/30'
        }`}
      >
        {dragging ? (
          <UploadCloud size={32} className="text-cobalt" aria-hidden="true" />
        ) : (
          <ImagePlus size={32} className="text-slate" aria-hidden="true" />
        )}
        <p className="mt-4 font-semibold">
          {dragging ? 'Drop the image here' : 'Drag and drop an image, or click to browse'}
        </p>
        <p className="mt-1 text-sm text-slate">JPG, PNG or WebP, up to {MAX_SIZE_MB} MB</p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
      </button>

      {error && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 rounded-lg border border-coral/30 bg-coral/5 px-3.5 py-2.5 text-sm text-coral"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}