export default {
  id: 'decorator-01',
  level: 3,
  title: 'A Armadura Encantada',
  dungeon: 'Oficina dos Encantamentos',
  xp: 150,
  narrative: `
Na Oficina dos Encantamentos, o herói encontrou a armuraria de Seraph.
Uma armadura básica podia ser encantada com fogo, gelo, raio — cada camada adicionando poder.
"Herança seria rígida demais," disse Seraph.
"Decorator envolve o objeto e estende seu comportamento sem modificar a classe original.
Empilhe quantos encantamentos quiser, em qualquer ordem."
  `,
  theory: `
## Decorator Pattern

**"Anexa responsabilidades adicionais a um objeto dinamicamente, como alternativa à herança."**

Um Decorator envolve (wraps) o objeto original, chamando o método base e adicionando
comportamento antes ou depois — sem alterar a classe original.

\`\`\`js
class Coffee {
  cost() { return 5 }
  description() { return 'Café' }
}
class MilkDecorator {
  constructor(coffee) { this.coffee = coffee }
  cost() { return this.coffee.cost() + 2 }
  description() { return this.coffee.description() + ' + Leite' }
}
\`\`\`
  `,
  starterCode: `// TODO: Crie a classe base Armor com:
//   - defense() → retorna 10 (defesa base)
//   - description() → retorna 'Armadura Básica'
//
// Crie 3 decorators, cada um recebe uma armor no construtor e a envolve:
//   FireEnchantment  — adiciona +15 de defesa, sufixo ' + Encantamento de Fogo'
//   IceEnchantment   — adiciona +20 de defesa, sufixo ' + Encantamento de Gelo'
//   LightningEnchant — adiciona +25 de defesa, sufixo ' + Encantamento de Raio'
//
// Cada decorator deve implementar defense() e description()
// chamando this.armor.defense() / this.armor.description() internamente

// export { Armor, FireEnchantment, IceEnchantment, LightningEnchant }
`,
  starterCodeTS: `// TODO: Crie a classe base Armor com defense(): number e description(): string
//
// Crie interface ArmorInterface { defense(): number; description(): string }
//
// Crie FireEnchantment, IceEnchantment, LightningEnchant
// Cada um recebe armor: ArmorInterface no construtor
// e delega + adiciona ao defense() e description()

// export { Armor, FireEnchantment, IceEnchantment, LightningEnchant }
`,
  tests: [
    {
      name: 'Armor base tem defense=10 e description correta',
      fn: ({ Armor }) => {
        if (!Armor) throw new Error('Armor não exportado')
        const a = new Armor()
        if (a.defense() !== 10) throw new Error('Armor.defense() deve retornar 10')
        if (typeof a.description() !== 'string') throw new Error('description() deve retornar string')
      }
    },
    {
      name: 'FireEnchantment adiciona +15 de defesa',
      fn: ({ Armor, FireEnchantment }) => {
        if (!FireEnchantment) throw new Error('FireEnchantment não exportado')
        const armor = new FireEnchantment(new Armor())
        if (armor.defense() !== 25) throw new Error('FireEnchantment deve somar 10 + 15 = 25')
        if (!armor.description().includes('Fogo')) throw new Error('description() deve mencionar Fogo')
      }
    },
    {
      name: 'IceEnchantment adiciona +20 de defesa',
      fn: ({ Armor, IceEnchantment }) => {
        if (!IceEnchantment) throw new Error('IceEnchantment não exportado')
        const armor = new IceEnchantment(new Armor())
        if (armor.defense() !== 30) throw new Error('IceEnchantment deve somar 10 + 20 = 30')
        if (!armor.description().includes('Gelo')) throw new Error('description() deve mencionar Gelo')
      }
    },
    {
      name: 'Decorators podem ser empilhados',
      fn: ({ Armor, FireEnchantment, IceEnchantment, LightningEnchant }) => {
        if (!LightningEnchant) throw new Error('LightningEnchant não exportado')
        // Fogo(10+15=25) → Gelo(25+20=45) → Raio(45+25=70)
        const armor = new LightningEnchant(new IceEnchantment(new FireEnchantment(new Armor())))
        if (armor.defense() !== 70) throw new Error('Empilhado: defesa deve ser 70 (10+15+20+25)')
        const desc = armor.description()
        if (!desc.includes('Fogo') || !desc.includes('Gelo') || !desc.includes('Raio')) {
          throw new Error('description() empilhado deve mencionar Fogo, Gelo e Raio')
        }
      }
    },
    {
      name: 'Classe base não é modificada pelo decorator',
      fn: ({ Armor, FireEnchantment }) => {
        const base = new Armor()
        new FireEnchantment(base) // envolve, não modifica
        if (base.defense() !== 10) throw new Error('Armor base não deve ser modificada pelo decorator')
      }
    },
  ]
}
