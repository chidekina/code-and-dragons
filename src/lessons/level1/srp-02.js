export default {
  id: 'srp-02',
  level: 1,
  title: 'O Grimório Confuso',
  dungeon: 'Caverna do Ferreiro',
  xp: 50,
  narrative: `
Na biblioteca da forja, o herói encontrou um grimório que fazia tudo:
calculava dano, salvava logs E formatava relatórios.
"Isso vai quebrar quando mudarmos o formato dos relatórios," avisou o herói.
  `,
  theory: `
## SRP na prática — separando concerns
Separe: lógica de negócio, persistência/logging e apresentação em classes distintas.
  `,
  starterCode: `// TODO: Separe em 3 classes:
// DamageCalculator — calcula dano
// Logger — salva logs
// ReportFormatter — formata relatório

class SpellBook {
  calculateDamage(spell, level) { return spell.power * level; }
  log(message) { console.log(\`[LOG] \${message}\`); return message; }
  formatReport(data) { return \`Relatório: \${JSON.stringify(data)}\`; }
}

// export { DamageCalculator, Logger, ReportFormatter }
`,
  tests: [
    {
      name: 'DamageCalculator calcula dano corretamente',
      fn: ({ DamageCalculator }) => {
        if (!DamageCalculator) throw new Error('DamageCalculator não exportado')
        const dc = new DamageCalculator()
        const result = dc.calculateDamage({ power: 10 }, 3)
        if (result !== 30) throw new Error(`Esperado 30, recebido ${result}`)
      }
    },
    {
      name: 'Logger retorna a mensagem logada',
      fn: ({ Logger }) => {
        if (!Logger) throw new Error('Logger não exportado')
        const l = new Logger()
        const result = l.log('teste')
        if (result !== 'teste') throw new Error('Logger deve retornar a mensagem')
      }
    },
    {
      name: 'ReportFormatter formata dados',
      fn: ({ ReportFormatter }) => {
        if (!ReportFormatter) throw new Error('ReportFormatter não exportado')
        const rf = new ReportFormatter()
        const result = rf.formatReport({ kills: 5 })
        if (!result.includes('kills')) throw new Error('Relatório deve incluir os dados')
      }
    },
  ]
}
