import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import CodeEditor from './CodeEditor'
import TestRunner from './TestRunner'
import { saveCode, getProgress } from '../store/progress'

export default function LessonView({ lesson, onComplete }) {
  const [code, setCode] = useState('')

  useEffect(() => {
    const saved = getProgress().savedCode[lesson.id]
    setCode(saved ?? lesson.starterCode)
  }, [lesson.id])

  function handleCodeChange(val) {
    setCode(val ?? '')
    saveCode(lesson.id, val ?? '')
  }

  function handleAllPassed() {
    onComplete(lesson.id, lesson.xp)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Left: Narrative + Theory */}
      <div className="md:w-1/2 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-stone rounded p-4">
          <p className="text-xs text-gold uppercase tracking-widest mb-1">{lesson.dungeon}</p>
          <h2 className="text-2xl font-bold text-white mb-3">{lesson.title}</h2>
          <p className="text-stone-300 whitespace-pre-line text-sm leading-relaxed">{lesson.narrative.trim()}</p>
        </div>

        <div className="bg-dungeon border border-stone rounded p-4">
          <h3 className="text-gold font-bold mb-2">📜 Teoria</h3>
          <div className="text-stone-300 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
            <Markdown>{lesson.theory.trim()}</Markdown>
          </div>
        </div>
      </div>

      {/* Right: Editor + Tests */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <CodeEditor value={code} onChange={handleCodeChange} />
        <TestRunner code={code} tests={lesson.tests} onAllPassed={handleAllPassed} />
      </div>
    </div>
  )
}
