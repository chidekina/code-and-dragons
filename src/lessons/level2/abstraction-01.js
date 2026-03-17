export default {
  id: 'abstraction-01',
  level: 2,
  title: 'O Grimório Esquecido',
  dungeon: 'Biblioteca das Sombras',
  xp: 90,
  narrative: `
Na Biblioteca das Sombras, o herói encontrou três portais mágicos.
Cada portal funcionava de maneira diferente internamente — runas, cristais, névoa.
Mas todos tinham a mesma interface: abrir() e fechar().
"Você não precisa saber como funciona," disse o bibliotecário.
"Apenas saiba o que ele faz. Isso é abstração."
  `,
  theory: `
## Abstração (Abstraction)

**"Esconda a complexidade interna e exponha apenas o que o usuário precisa saber."**

A abstração define um contrato (interface/classe abstrata) que as implementações
devem seguir, ocultando os detalhes de como cada uma funciona.

Em JS simulamos com classes base que lançam erro ao não serem implementadas:

\`\`\`js
class Portal {
  open() { throw new Error('Implemente open()') }
  close() { throw new Error('Implemente close()') }
}
class RunePortal extends Portal {
  open() { return 'Portal de runas aberto' }
  close() { return 'Runas apagadas' }
}
\`\`\`
  `,
  starterCode: `// TODO: Crie a classe abstrata Portal com:
//   - open() — lança Error('Não implementado') se chamado diretamente
//   - close() — lança Error('Não implementado') se chamado diretamente
//   - isOpen (boolean, começa false)
//
// Crie 3 implementações concretas que SOBRESCREVEM open() e close():
//   RunePortal   — usa runas
//   CrystalPortal — usa cristais
//   MistPortal   — usa névoa
//
// Cada open() deve setar isOpen = true e retornar string descritiva
// Cada close() deve setar isOpen = false e retornar string descritiva

// export { Portal, RunePortal, CrystalPortal, MistPortal }
`,
  starterCodeTS: `// TODO: Crie a classe abstrata Portal com:
//   - open(): string — lança Error se não implementado
//   - close(): string — lança Error se não implementado
//   - isOpen: boolean (começa false)
//
// Crie RunePortal, CrystalPortal, MistPortal — todas extends Portal

// export { Portal, RunePortal, CrystalPortal, MistPortal }
`,
  tests: [
    {
      name: 'Portal base lança erro em open() e close()',
      fn: ({ Portal }) => {
        if (!Portal) throw new Error('Portal não exportado')
        const p = new Portal()
        let threw = false
        try { p.open() } catch { threw = true }
        if (!threw) throw new Error('Portal.open() deve lançar erro (classe abstrata)')
      }
    },
    {
      name: 'RunePortal implementa open() e close()',
      fn: ({ Portal, RunePortal }) => {
        if (!RunePortal) throw new Error('RunePortal não exportado')
        const r = new RunePortal()
        if (!(r instanceof Portal)) throw new Error('RunePortal deve estender Portal')
        const o = r.open()
        if (typeof o !== 'string') throw new Error('open() deve retornar string')
        if (!r.isOpen) throw new Error('isOpen deve ser true após open()')
        const c = r.close()
        if (typeof c !== 'string') throw new Error('close() deve retornar string')
        if (r.isOpen) throw new Error('isOpen deve ser false após close()')
      }
    },
    {
      name: 'CrystalPortal e MistPortal funcionam da mesma forma',
      fn: ({ Portal, CrystalPortal, MistPortal }) => {
        if (!CrystalPortal) throw new Error('CrystalPortal não exportado')
        if (!MistPortal) throw new Error('MistPortal não exportado')
        for (const Cls of [CrystalPortal, MistPortal]) {
          const p = new Cls()
          if (!(p instanceof Portal)) throw new Error(`${Cls.name} deve estender Portal`)
          p.open()
          if (!p.isOpen) throw new Error(`${Cls.name}: isOpen deve ser true após open()`)
          p.close()
          if (p.isOpen) throw new Error(`${Cls.name}: isOpen deve ser false após close()`)
        }
      }
    },
    {
      name: 'Cada portal retorna mensagens distintas',
      fn: ({ RunePortal, CrystalPortal, MistPortal }) => {
        const r = new RunePortal().open()
        const c = new CrystalPortal().open()
        const m = new MistPortal().open()
        if (r === c || c === m) throw new Error('Cada portal deve ter mensagem de abertura única')
      }
    },
  ]
}
