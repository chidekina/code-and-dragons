export default {
  id: 'inheritance-01',
  level: 2,
  title: 'O Legado do Paladino',
  dungeon: 'Torre dos Ancestrais',
  xp: 80,
  narrative: `
Na Torre dos Ancestrais, o herói encontrou três guerreiros: um Paladino, um Arqueiro e um Mago.
Cada um lutava de forma diferente, mas todos compartilhavam a mesma essência: eram Heróis.
"Não repita o que é comum," ecoou a voz dos ancestrais.
"Coloque na classe pai o que todos herdam, e nas filhas apenas o que é único."
  `,
  theory: `
## Herança (Inheritance)

**"Uma classe filha herda atributos e métodos da classe pai, especializando-os."**

A herança permite reaproveitar código comum em uma classe base e adicionar ou sobrescrever
comportamentos específicos nas subclasses. Evita duplicação e organiza hierarquias naturais.

\`\`\`js
class Animal {
  falar() { return 'som genérico' }
}
class Cachorro extends Animal {
  falar() { return 'Au!' }
}
\`\`\`
  `,
  starterCode: `// Todos os heróis têm: name (string), hp (number) e método isAlive() → boolean (hp > 0)
// TODO: Crie a classe base Hero com name, hp e isAlive()
// Crie Paladin extends Hero — adicione shield (number) e método block() → string
// Crie Archer extends Hero  — adicione arrows (number) e método shoot() → string
// Crie Mage extends Hero    — adicione mana (number) e método cast() → string

// export { Hero, Paladin, Archer, Mage }
`,
  starterCodeTS: `// Todos os heróis têm: name (string), hp (number) e método isAlive() → boolean
// TODO: Crie a classe base Hero com name, hp e isAlive()
// Crie Paladin extends Hero — adicione shield: number e método block(): string
// Crie Archer extends Hero  — adicione arrows: number e método shoot(): string
// Crie Mage extends Hero    — adicione mana: number e método cast(): string

// export { Hero, Paladin, Archer, Mage }
`,
  tests: [
    {
      name: 'Hero tem name, hp e isAlive()',
      fn: ({ Hero }) => {
        if (!Hero) throw new Error('Hero não exportado')
        const h = new Hero('Test', 100)
        if (h.name !== 'Test') throw new Error('Hero deve ter propriedade name')
        if (h.hp !== 100) throw new Error('Hero deve ter propriedade hp')
        if (typeof h.isAlive !== 'function') throw new Error('Hero deve ter método isAlive()')
        if (h.isAlive() !== true) throw new Error('isAlive() deve retornar true quando hp > 0')
      }
    },
    {
      name: 'isAlive() retorna false quando hp <= 0',
      fn: ({ Hero }) => {
        const h = new Hero('Dead', 0)
        if (h.isAlive() !== false) throw new Error('isAlive() deve retornar false quando hp = 0')
      }
    },
    {
      name: 'Paladin herda de Hero e tem block()',
      fn: ({ Hero, Paladin }) => {
        if (!Paladin) throw new Error('Paladin não exportado')
        const p = new Paladin('Arthur', 150, 50)
        if (!(p instanceof Hero)) throw new Error('Paladin deve ser instância de Hero')
        if (typeof p.isAlive !== 'function') throw new Error('Paladin deve herdar isAlive()')
        if (typeof p.block !== 'function') throw new Error('Paladin deve ter método block()')
        if (typeof p.block() !== 'string') throw new Error('block() deve retornar string')
      }
    },
    {
      name: 'Archer herda de Hero e tem shoot()',
      fn: ({ Hero, Archer }) => {
        if (!Archer) throw new Error('Archer não exportado')
        const a = new Archer('Legolas', 120, 20)
        if (!(a instanceof Hero)) throw new Error('Archer deve ser instância de Hero')
        if (typeof a.shoot !== 'function') throw new Error('Archer deve ter método shoot()')
        if (typeof a.shoot() !== 'string') throw new Error('shoot() deve retornar string')
      }
    },
    {
      name: 'Mage herda de Hero e tem cast()',
      fn: ({ Hero, Mage }) => {
        if (!Mage) throw new Error('Mage não exportado')
        const m = new Mage('Gandalf', 80, 200)
        if (!(m instanceof Hero)) throw new Error('Mage deve ser instância de Hero')
        if (typeof m.cast !== 'function') throw new Error('Mage deve ter método cast()')
        if (typeof m.cast() !== 'string') throw new Error('cast() deve retornar string')
      }
    },
  ]
}
