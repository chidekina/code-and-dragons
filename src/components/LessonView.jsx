import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BookOpen } from 'lucide-react'
import CodeEditor from './CodeEditor'
import TestRunner from './TestRunner'
import { saveCode, getSavedCode } from '../store/progress'

const LANG_KEY = 'code-and-dragons-language'

function getStarterCode(lesson, language) {
  return language === 'typescript' && lesson.starterCodeTS
    ? lesson.starterCodeTS
    : lesson.starterCode
}

export default function LessonView({ lesson, onComplete }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem(LANG_KEY) ?? 'javascript'
  )
  const [code, setCode] = useState(
    () => getSavedCode(lesson.id, localStorage.getItem(LANG_KEY) ?? 'javascript')
      ?? getStarterCode(lesson, localStorage.getItem(LANG_KEY) ?? 'javascript')
  )

  // When lesson or language changes, load saved code or starter code
  useEffect(() => {
    const saved = getSavedCode(lesson.id, language)
    setCode(saved ?? getStarterCode(lesson, language))
  }, [lesson.id, language])

  function handleLanguageChange(lang) {
    setLanguage(lang)
    localStorage.setItem(LANG_KEY, lang)
  }

  function handleCodeChange(val) {
    setCode(val ?? '')
    saveCode(lesson.id, val ?? '', language)
  }

  function handleAllPassed() {
    onComplete(lesson.id, lesson.xp)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full">
      {/* Left: Narrative + Theory */}
      <div className="md:w-1/2 flex flex-col gap-4 overflow-y-auto">
        <section aria-label="Narrativa" className="bg-stone rounded p-4">
          <p className="text-xs text-gold uppercase tracking-widest mb-1">{lesson.dungeon}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{lesson.title}</h2>
          <p className="text-stone-300 whitespace-pre-line text-sm leading-relaxed">{lesson.narrative.trim()}</p>
        </section>

        <section aria-label="Teoria" className="bg-dungeon border border-stone rounded p-4">
          <h3 className="text-gold font-bold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Teoria
          </h3>
          <div className="text-stone-300 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{lesson.theory.trim()}</Markdown>
          </div>
        </section>
      </div>

      {/* Right: Editor + Tests */}
      <section aria-label="Editor de código e testes" className="md:w-1/2 flex flex-col gap-4">
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
        <TestRunner
          code={code}
          tests={lesson.tests}
          language={language}
          onAllPassed={handleAllPassed}
        />
      </section>
    </div>
  )
}
