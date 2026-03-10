import { useState } from 'react'

function runTests(code, tests) {
  return tests.map(test => {
    try {
      const exports = {}
      const fn = new Function('exports', code)
      fn(exports)
      test.fn(exports)
      return { name: test.name, passed: true, error: null }
    } catch (err) {
      return { name: test.name, passed: false, error: err.message }
    }
  })
}

export default function TestRunner({ code, tests, onAllPassed }) {
  const [results, setResults] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  function handleRun() {
    setShowSuccess(false)
    const res = runTests(code, tests)
    setResults(res)
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
        className="cursor-pointer bg-gold text-dungeon font-bold px-4 py-2 rounded hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-dungeon"
      >
        ⚔️ Verificar Magia
      </button>

      {/* Feedback de sucesso */}
      {showSuccess && (
        <div role="status" className="bg-green-950 border border-green-700 rounded p-3 text-green-300 font-bold text-sm animate-pulse">
          🎉 Todos os testes passaram! Avançando para próxima lição…
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
              <span aria-hidden="true">{r.passed ? '✅' : '❌'}</span>
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
