import { RotateCcw } from 'lucide-react'

function formatSize(bytes) {
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

// Shows the chosen image with its file info, plus a button to pick a different one.
export default function ImagePreview({ file, previewUrl, onReset }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <img src={previewUrl} alt={`Preview of ${file.name}`} className="max-h-96 w-full object-contain bg-fog" />
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="truncate font-semibold">{file.name}</p>
          <p className="text-sm text-slate">{formatSize(file.size)}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Choose different image
        </button>
      </div>
    </div>
  )
}