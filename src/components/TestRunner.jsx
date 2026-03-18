import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, XCircle, Loader2, Wand2, PartyPopper } from 'lucide-react'

function stripTS(code) {
  return code
    .split('\n')
    // remove standalone abstract method declarations: "  abstract foo(): string;"
    .filter(line => !/^\s*abstract\s+\w+.*;\s*$/.test(line))
    // remove typed field declarations: "  private x: Type" or "  name: string"
    .filter(line => !/^\s*(private|public|protected|readonly)\s+\w+(\??)\s*:\s*\w/.test(line))
    .filter(line => !/^\s*\w+(\??)\s*:\s*(string|number|boolean|void|any|never|unknown)\s*[;=]/.test(line))
    .join('\n')
    .replace(/\babstract\s+/g, '')
    .replace(/\b(private|public|protected|readonly)\s+(?=\w)/g, '')
    .replace(/\bdeclare\s+/g, '')
    .replace(/\binterface\s+\w+\s*\{[^}]*\}/gs, '')
    // return type annotations: "): Spell {" or "): string {"
    .replace(/\)\s*:\s*\w+(\[\])?\s*(?=[{;,])/g, ') ')
    // parameter type annotations: "(type: string)" or "(weapon: Weapon)"
    .replace(/(\w+)\s*\??\s*:\s*[\w<>\[\]|& ]+(?=[,)])/g, '$1')
    // variable type annotations: "const x: Foo ="
    .replace(/:\s*(string|number|boolean|void|object|any|never|unknown)(\[\])?\b/g, '')
    .replace(/<[A-Z]\w*>/g, '')
}

async function transpileTS(code) {
  return stripTS(code)
}

function stripESM(code) {
  return code
    // export class Foo / export function foo / export const foo = ...
    .replace(/\bexport\s+(default\s+)?(?=class|function|const|let|var)/g, '')
    // export { Foo, Bar, Baz } — collect names then remove the block
    .replace(/export\s*\{[^}]*\}\s*;?/g, (match) => {
      // inject exports.X = X for each name found
      const names = [...match.matchAll(/\b(\w+)\b/g)]
        .map(m => m[1])
        .filter(n => n !== 'export')
      return names.map(n => `exports.${n} = ${n};`).join('\n')
    })
    // export default SomeName
    .replace(/\bexport\s+default\s+(\w+)\s*;?/g, 'exports.default = $1;')
}

async function runTests(code, tests, language) {
  const runnable = language === 'typescript' ? await transpileTS(code) : code
  const prepared = stripESM(runnable)
  return tests.map(test => {
    try {
      const exports = {}
      // Shadow browser globals so student code can't wipe the DOM
      const fn = new Function(
        'exports', 'window', 'document', 'globalThis', 'self',
        'location', 'history', 'navigator', 'alert', 'confirm', 'prompt',
        prepared
      )
      fn(exports, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
      test.fn(exports)
      return { name: test.name, passed: true, error: null }
    } catch (err) {
      return { name: test.name, passed: false, error: err.message }
    }
  })
}

const DISMISS_MS = 5000

export default function TestRunner({ code, tests, language = 'javascript', onAllPassed }) {
  const [results, setResults] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  async function handleRun() {
    clearTimeout(timerRef.current)
    setShowSuccess(false)
    setRunning(true)
    const res = await runTests(code, tests, language)
    setResults(res)
    setRunning(false)
    const allPassed = res.every(r => r.passed)
    if (allPassed) {
      setShowSuccess(true)
      onAllPassed?.()
    }
    timerRef.current = setTimeout(() => { setResults(null); setShowSuccess(false) }, DISMISS_MS)
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleRun}
        disabled={running}
        aria-busy={running}
        className="cursor-pointer disabled:cursor-wait bg-gold text-dungeon font-bold px-4 py-2 rounded hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dungeon disabled:opacity-70"
      >
        <span className="flex items-center gap-2 justify-center">
          {running
            ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Compilando…</>
            : <><Wand2 className="w-4 h-4" aria-hidden="true" /> Verificar Magia</>}
        </span>
      </button>

      {/* Feedback de sucesso */}
      {showSuccess && (
        <div role="status" className="bg-green-950 border border-green-700 rounded p-3 text-green-300 font-bold text-sm flex items-center gap-2">
          <PartyPopper className="w-4 h-4 shrink-0" aria-hidden="true" />
          Todos os testes passaram! Avançando para próxima lição…
        </div>
      )}

      {/* Resultados dos testes */}
      {results && (
        <ul
          aria-live="polite"
          aria-label="Resultados dos testes"
          className="flex flex-col gap-2"
        >
          {results.map(r => (
            <li
              key={r.name}
              className={`p-2 rounded text-sm transition-colors ${r.passed ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}
            >
              {r.passed
                ? <CheckCircle2 className="w-4 h-4 shrink-0 inline-block me-1.5" aria-hidden="true" />
                : <XCircle className="w-4 h-4 shrink-0 inline-block me-1.5" aria-hidden="true" />}
              <span className="sr-only">{r.passed ? 'Passou:' : 'Falhou:'}</span>
              {' '}{r.name}
              {r.error && (
                <p className="mt-1 font-mono text-xs opacity-80" role="alert">{r.error}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
