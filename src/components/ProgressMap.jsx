import { CheckCircle2, Sword, Lock } from 'lucide-react'
import { isCompleted, isUnlocked } from '../store/progress'

export default function ProgressMap({ lessons, onSelect, currentId }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-gold font-bold text-lg mb-2 flex items-center gap-2 gold-glow" style={{fontFamily: "'IM Fell English', Georgia, serif"}}>
        <Sword className="w-4 h-4" aria-hidden="true" />
        Mapa do Dungeon
      </h2>
      {lessons.map((lesson) => {
        const completed = isCompleted(lesson.id)
        const unlocked = isUnlocked(lesson, lessons)
        const current = lesson.id === currentId

        return (
          <button
            key={lesson.id}
            disabled={!unlocked}
            aria-current={current ? 'page' : undefined}
            aria-label={`${lesson.title} — ${completed ? 'Completo' : unlocked ? 'Disponível' : 'Bloqueado'}, +${lesson.xp} XP`}
            onClick={() => unlocked && onSelect(lesson)}
            className={`
              text-left p-3 rounded border transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-dungeon
              ${current ? 'border-gold bg-stone text-white gold-glow' : ''}
              ${completed ? 'border-green-700 bg-green-950 text-green-300' : ''}
              ${unlocked && !completed && !current ? 'border-stone bg-dungeon text-stone-300 hover:border-gold cursor-pointer' : ''}
              ${!unlocked ? 'border-stone-800 bg-stone-950 text-stone-600 cursor-not-allowed opacity-50' : ''}
              ${current ? 'cursor-pointer' : ''}
              ${completed && !current ? 'cursor-pointer' : ''}
            `}
          >
            <span aria-hidden="true" className="me-2 inline-flex items-center">
              {completed
                ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                : unlocked
                  ? <Sword className="w-4 h-4 text-gold" />
                  : <Lock className="w-4 h-4 text-stone-600" />}
            </span>
            <span className="font-medium text-wrap-balance">{lesson.title}</span>
            <span className="text-xs ms-2 opacity-60 tabular-nums">+{lesson.xp} XP</span>
          </button>
        )
      })}
    </div>
  )
}
