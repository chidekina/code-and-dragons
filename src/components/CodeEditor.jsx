import { Component } from 'react'
import Editor from '@monaco-editor/react'

class EditorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return (
        <textarea
          className="w-full h-[380px] bg-[#1e1e1e] text-white font-mono text-sm p-3 resize-none border border-stone/30 rounded-b focus:outline-none"
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
          spellCheck={false}
          aria-label="Editor de código (fallback)"
        />
      )
    }
    return this.props.children
  }
}

export default function CodeEditor({ value, onChange, language, onLanguageChange }) {
  return (
    <div className="flex flex-col gap-0">
      {/* Language toggle */}
      <div className="flex items-center gap-1 bg-[#1e1e1e] border-b border-white/10 px-3 py-1.5 rounded-t">
        <span className="text-xs text-stone-500 me-2">Linguagem:</span>
        {['javascript', 'typescript'].map(lang => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            aria-pressed={language === lang}
            className={`
              cursor-pointer text-xs px-2.5 py-1 rounded font-mono font-medium transition-colors
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
              ${language === lang
                ? 'bg-gold text-dungeon'
                : 'text-stone-400 hover:text-white hover:bg-white/10'}
            `}
          >
            {lang === 'javascript' ? 'JS' : 'TS'}
          </button>
        ))}
        {language === 'typescript' && (
          <span className="ms-auto text-xs text-stone-500 italic">tipos são removidos antes dos testes</span>
        )}
      </div>

      <EditorBoundary value={value} onChange={onChange}>
        <Editor
          height="380px"
          language={language}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            tabSize: 2,
          }}
        />
      </EditorBoundary>
    </div>
  )
}
