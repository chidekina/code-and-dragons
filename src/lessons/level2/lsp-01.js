export default {
  id: 'lsp-01',
  level: 2,
  title: 'O Arqueiro Élfico',
  dungeon: 'Torre do Mago',
  xp: 100,
  narrative: `
Na Torre do Mago, havia um Archer base e um ElvenArcher que o estendia.
Mas ElvenArcher sobrescrevia shoot() lançando um erro em vez de atirar.
"Uma subclasse deve poder substituir sua classe pai sem quebrar o sistema," explicou o mago.
  `,
  theory: `
## Liskov Substitution Principle (LSP)
**"Subclasses devem ser substituíveis por suas classes base."**

Se S é subtipo de T, objetos de T podem ser substituídos por objetos de S
sem alterar o comportamento esperado do programa.
  `,
  starterCode: `// ElvenArcher quebra o LSP — lança erro em vez de atirar.
// TODO: Corrija ElvenArcher para que seja substituível por Archer.
// ElvenArcher deve sobrescrever shoot() retornando uma string válida.
// Pode adicionar um método especial elfShoot() para o comportamento extra.

class Archer {
  shoot() { return 'Flecha disparada: 15 dano'; }
  reload() { return 'Arco recarregado'; }
}

class ElvenArcher extends Archer {
  shoot() {
    throw new Error('Elfos não atiram flechas comuns!'); // quebra LSP!
  }
}

// export { Archer, ElvenArcher }
`,
  tests: [
    {
      name: 'ElvenArcher.shoot() não lança erro',
      fn: ({ ElvenArcher }) => {
        if (!ElvenArcher) throw new Error('ElvenArcher não exportado')
        const ea = new ElvenArcher()
        let result
        try { result = ea.shoot() } catch (e) { throw new Error('ElvenArcher.shoot() não deve lançar erro') }
        if (typeof result !== 'string') throw new Error('shoot() deve retornar string')
      }
    },
    {
      name: 'ElvenArcher é substituível por Archer',
      fn: ({ Archer, ElvenArcher }) => {
        if (!Archer) throw new Error('Archer não exportado')
        if (!(new ElvenArcher() instanceof Archer)) throw new Error('ElvenArcher deve estender Archer')
        const ea = new ElvenArcher()
        if (typeof ea.reload !== 'function') throw new Error('ElvenArcher deve herdar reload()')
      }
    },
  ]
}
