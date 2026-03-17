export default {
  id: 'encapsulation-01',
  level: 2,
  title: 'O Cofre do Alquimista',
  dungeon: 'Laboratório Proibido',
  xp: 85,
  narrative: `
No Laboratório Proibido, o alquimista Vareth guardava suas poções em frascos abertos.
Qualquer aventureiro podia alterar os ingredientes diretamente — e explosões eram frequentes.
"Os dados internos devem ser protegidos," avisou o herói.
"Exponha apenas o necessário. Valide tudo que entra."
  `,
  theory: `
## Encapsulamento (Encapsulation)

**"Esconda o estado interno e exponha apenas uma interface controlada."**

Encapsulamento protege os dados de modificações indevidas e garante que invariantes
sejam mantidas. Em JS/TS usamos campos privados (\`#\`) ou convenção (\`_\`),
combinados com getters/setters que validam.

\`\`\`js
class BankAccount {
  #balance = 0
  deposit(amount) {
    if (amount <= 0) throw new Error('Valor inválido')
    this.#balance += amount
  }
  get balance() { return this.#balance }
}
\`\`\`
  `,
  starterCode: `// TODO: Crie a classe Potion com:
//   - _ingredients (array privado, inicialmente vazio)
//   - _potency (number privado, inicialmente 0)
//   - addIngredient(name, power) — adiciona ao array e soma power em _potency
//     Lança Error se name não for string ou power <= 0
//   - getter ingredients — retorna cópia do array (não a referência original!)
//   - getter potency — retorna _potency
//   - brew() — retorna string descrevendo a poção com potency

// export { Potion }
`,
  starterCodeTS: `// TODO: Crie a classe Potion com:
//   - _ingredients: { name: string; power: number }[] (privado)
//   - _potency: number (privado)
//   - addIngredient(name: string, power: number): void
//     Lança Error se name não for string ou power <= 0
//   - get ingredients(): { name: string; power: number }[]  ← cópia!
//   - get potency(): number
//   - brew(): string

// export { Potion }
`,
  tests: [
    {
      name: 'Potion começa vazia com potency 0',
      fn: ({ Potion }) => {
        if (!Potion) throw new Error('Potion não exportada')
        const p = new Potion()
        if (p.potency !== 0) throw new Error('potency inicial deve ser 0')
        if (!Array.isArray(p.ingredients) || p.ingredients.length !== 0) {
          throw new Error('ingredients inicial deve ser array vazio')
        }
      }
    },
    {
      name: 'addIngredient acumula potency corretamente',
      fn: ({ Potion }) => {
        const p = new Potion()
        p.addIngredient('Erva Mágica', 30)
        p.addIngredient('Pó de Fada', 20)
        if (p.potency !== 50) throw new Error('potency deve ser 50 após adicionar 30+20')
        if (p.ingredients.length !== 2) throw new Error('ingredients deve ter 2 itens')
      }
    },
    {
      name: 'ingredients getter retorna cópia (não referência)',
      fn: ({ Potion }) => {
        const p = new Potion()
        p.addIngredient('Raiz', 10)
        const copy = p.ingredients
        copy.push({ name: 'Hack', power: 999 })
        if (p.ingredients.length !== 1) {
          throw new Error('Modificar o getter não deve alterar o array interno')
        }
      }
    },
    {
      name: 'addIngredient lança erro para power <= 0',
      fn: ({ Potion }) => {
        const p = new Potion()
        let threw = false
        try { p.addIngredient('Veneno', -5) } catch { threw = true }
        if (!threw) throw new Error('Deve lançar erro para power <= 0')
      }
    },
    {
      name: 'brew() retorna string descritiva',
      fn: ({ Potion }) => {
        const p = new Potion()
        p.addIngredient('Cristal', 40)
        const result = p.brew()
        if (typeof result !== 'string') throw new Error('brew() deve retornar string')
        if (result.length === 0) throw new Error('brew() não deve retornar string vazia')
      }
    },
  ]
}
