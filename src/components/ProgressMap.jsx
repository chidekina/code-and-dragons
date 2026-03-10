import { isCompleted, isUnlocked } from '../store/progress'

export default function ProgressMap({ lessons, onSelect, currentId }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-gold font-bold text-lg mb-2">🗺️ Mapa do Dungeon</h2>
      {lessons.map((lesson) => {
        const completed = isCompleted(lesson.id)
        const unlocked = isUnlocked(lesson, lessons)
        const current = lesson.id === currentId

        return (
          <button
            key={lesson.id}
            disabled={!unlocked}
            onClick={() => unlocked && onSelect(lesson)}
            className={`
              text-left p-3 rounded border transition
              ${current ? 'border-gold bg-stone text-white' : ''}
              ${completed ? 'border-green-700 bg-green-950 text-green-300' : ''}
              ${unlocked && !completed && !current ? 'border-stone bg-dungeon text-stone-300 hover:border-gold' : ''}
              ${!unlocked ? 'border-stone-800 bg-stone-950 text-stone-600 cursor-not-allowed opacity-50' : ''}
            `}
          >
            <span className="text-xs mr-2">{completed ? '✅' : unlocked ? '⚔️' : '🔒'}</span>
            <span className="font-medium">{lesson.title}</span>
            <span className="text-xs ml-2 opacity-60">+{lesson.xp} XP</span>
          </button>
        )
      })}
    </div>
  )
}
