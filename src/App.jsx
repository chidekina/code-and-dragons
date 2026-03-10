import { useState } from 'react'
import { lessons } from './lessons/index'
import ProgressMap from './components/ProgressMap'
import LessonView from './components/LessonView'
import MobileNav from './components/MobileNav'
import { completeLesson, getProgress } from './store/progress'

export default function App() {
  const [current, setCurrent] = useState(lessons[0])
  const [progress, setProgress] = useState(getProgress())

  function handleComplete(lessonId, xp) {
    const updated = completeLesson(lessonId, xp)
    setProgress(updated)
    const idx = lessons.findIndex(l => l.id === lessonId)
    if (idx < lessons.length - 1) setCurrent(lessons[idx + 1])
  }

  return (
    <div className="min-h-screen bg-dungeon text-white flex flex-col">
      {/* Skip link para navegação por teclado */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-gold focus:text-dungeon focus:px-3 focus:py-1 focus:rounded focus:font-bold"
      >
        Ir para conteúdo
      </a>

      <header role="banner" className="border-b border-stone px-4 py-3 flex items-center justify-between">
        <h1 className="text-gold font-bold text-xl">⚔️ Code & Dragons</h1>
        <div className="flex items-center gap-3">
          <MobileNav lessons={lessons} onSelect={setCurrent} currentId={current.id} />
          <span className="text-sm text-stone-400 tabular-nums">✨ {progress.xp} XP</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside aria-label="Mapa do dungeon" className="hidden md:block w-64 border-r border-stone overflow-y-auto shrink-0">
          <ProgressMap lessons={lessons} onSelect={setCurrent} currentId={current.id} />
        </aside>

        <main id="main" role="main" className="flex-1 p-4 md:p-6 overflow-y-auto">
          <LessonView lesson={current} onComplete={handleComplete} />
        </main>
      </div>
    </div>
  )
}
