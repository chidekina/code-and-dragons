export default {
  id: 'factory-01',
  level: 2,
  title: 'A Fábrica de Feitiços',
  dungeon: 'Torre do Mago',
  xp: 100,
  narrative: `
O mago precisava criar feitiços — Fire, Ice e Lightning.
Mas o código do herói precisava conhecer cada classe individualmente.
"Use uma fábrica," disse o mago. "Peça o feitiço pelo nome, receba o objeto."
  `,
  theory: `
## Factory Pattern
**"Delega a criação de objetos para uma função/classe fábrica."**

Em vez de instanciar classes diretamente com new, use uma factory que
encapsula a lógica de criação e retorna o objeto correto.
  `,
  starterCode: `// TODO: Crie as classes FireSpell, IceSpell, LightningSpell
// com método cast() retornando uma string descrevendo o efeito.
// Crie SpellFactory com método estático create(type) que retorna
// a instância correta baseada no tipo ('fire', 'ice', 'lightning').

// export { SpellFactory, FireSpell, IceSpell, LightningSpell }
`,
  tests: [
    {
      name: "SpellFactory.create('fire') retorna FireSpell",
      fn: ({ SpellFactory, FireSpell }) => {
        if (!SpellFactory) throw new Error('SpellFactory não exportado')
        if (!FireSpell) throw new Error('FireSpell não exportado')
        const spell = SpellFactory.create('fire')
        if (!(spell instanceof FireSpell)) throw new Error("create('fire') deve retornar FireSpell")
      }
    },
    {
      name: 'Todos os feitiços têm método cast()',
      fn: ({ SpellFactory }) => {
        if (!SpellFactory) throw new Error('SpellFactory não exportado')
        const types = ['fire', 'ice', 'lightning']
        for (const type of types) {
          const spell = SpellFactory.create(type)
          if (typeof spell.cast !== 'function') throw new Error(`${type} deve ter método cast()`)
          const result = spell.cast()
          if (typeof result !== 'string') throw new Error(`cast() de ${type} deve retornar string`)
        }
      }
    },
    {
      name: 'Tipo desconhecido lança erro',
      fn: ({ SpellFactory }) => {
        if (!SpellFactory) throw new Error('SpellFactory não exportado')
        let threw = false
        try { SpellFactory.create('unknown') } catch { threw = true }
        if (!threw) throw new Error("create('unknown') deve lançar erro")
      }
    },
  ]
}
