import { useState } from 'react'

function runTests(code, tests) {
  return tests.map(test => {
    try {
      // Build a module-like scope: run code, collect exports
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

  function handleRun() {
    const res = runTests(code, tests)
    setResults(res)
    if (res.every(r => r.passed)) onAllPassed?.()
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleRun}
        className="bg-gold text-dungeon font-bold px-4 py-2 rounded hover:opacity-90 transition"
      >
        ⚔️ Verificar Magia
      </button>

      {results && (
        <ul className="flex flex-col gap-2">
          {results.map(r => (
            <li key={r.name} className={`p-2 rounded text-sm ${r.passed ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {r.passed ? '✅' : '❌'} {r.name}
              {r.error && <p className="mt-1 font-mono text-xs opacity-80">{r.error}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
