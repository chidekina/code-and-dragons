import { useState } from 'react'
import { CheckCircle2, XCircle, Loader2, Wand2, PartyPopper } from 'lucide-react'

async function transpileTS(code) {
  try {
    // Monaco bundles the TS compiler — use it to strip types
    const monaco = await import('monaco-editor')
    const uri = monaco.Uri.parse('file:///lesson.ts')
    const existing = monaco.editor.getModel(uri)
    const model = existing ?? monaco.editor.createModel(code, 'typescript', uri)
    if (existing) monaco.editor.getModel(uri).setValue(code)
    const worker = await monaco.languages.typescript.getTypeScriptWorker()
    const client = await worker(uri)
    const output = await client.getEmitOutput(uri.toString())
    const jsCode = output.outputFiles[0]?.text ?? code
    if (!existing) model.dispose()
    return jsCode
  } catch {
    // Fallback: naive type stripping (removes : Type annotations and <T> generics)
    return code
      .replace(/:\s*[\w<>\[\]|&{}(),\s]+(?=[=,);{])/g, '')
      .replace(/<[A-Z]\w*>/g, '')
  }
}

async function runTests(code, tests, language) {
  const runnable = language === 'typescript' ? await transpileTS(code) : code
  return tests.map(test => {
    try {
      const exports = {}
      const fn = new Function('exports', runnable)
      fn(exports)
      test.fn(exports)
      return { name: test.name, passed: true, error: null }
    } catch (err) {
      return { name: test.name, passed: false, error: err.message }
    }
  })
}

export default function TestRunner({ code, tests, language = 'javascript', onAllPassed }) {
  const [results, setResults] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [running, setRunning] = useState(false)

  async function handleRun() {
    setShowSuccess(false)
    setRunning(true)
    const res = await runTests(code, tests, language)
    setResults(res)
    setRunning(false)
    if (res.every(r => r.passed)) {
      setShowSuccess(true)
      onAllPassed?.()
    }
  }

  const allPassed = results && results.every(r => r.passed)

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
