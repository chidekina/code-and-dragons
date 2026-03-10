import { useState } from 'react'
import ProgressMap from './ProgressMap'

export default function MobileNav({ lessons, onSelect, currentId }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden px-3 py-2 text-gold border border-stone rounded"
      >
        ☰ Mapa
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 md:hidden" onClick={() => setOpen(false)}>
          <div className="w-72 h-full bg-dungeon border-r border-stone overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-3 border-b border-stone">
              <span className="text-gold font-bold">Mapa do Dungeon</span>
              <button onClick={() => setOpen(false)} className="text-stone-400">✕</button>
            </div>
            <ProgressMap lessons={lessons} onSelect={(l) => { onSelect(l); setOpen(false) }} currentId={currentId} />
          </div>
        </div>
      )}
    </>
  )
}
