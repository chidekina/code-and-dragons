import { useState } from 'react'
import { Map, X } from 'lucide-react'
import ProgressMap from './ProgressMap'

export default function MobileNav({ lessons, onSelect, currentId }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir mapa do dungeon"
        aria-expanded={open}
        className="md:hidden cursor-pointer px-3 py-2 text-gold border border-stone rounded hover:border-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Map className="w-4 h-4 me-1.5" aria-hidden="true" />
        Mapa
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 md:hidden"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mapa do dungeon"
        >
          <div className="w-72 h-full bg-dungeon border-r border-stone overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-3 border-b border-stone">
              <span className="text-gold font-bold">Mapa do Dungeon</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar mapa"
                className="cursor-pointer text-stone-400 hover:text-white transition-colors p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <ProgressMap lessons={lessons} onSelect={(l) => { onSelect(l); setOpen(false) }} currentId={currentId} />
          </div>
        </div>
      )}
    </>
  )
}
