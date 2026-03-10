import { useState } from 'react'
import { lessons } from './lessons/index'
import ProgressMap from './components/ProgressMap'
import LessonView from './components/LessonView'
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
      <header className="border-b border-stone px-4 py-3 flex items-center justify-between">
        <h1 className="text-gold font-bold text-xl">⚔️ Code & Dragons</h1>
        <span className="text-sm text-stone-400">✨ {progress.xp} XP</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 border-r border-stone overflow-y-auto shrink-0">
          <ProgressMap lessons={lessons} onSelect={setCurrent} currentId={current.id} />
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <LessonView lesson={current} onComplete={handleComplete} />
        </main>
      </div>
    </div>
  )
}
