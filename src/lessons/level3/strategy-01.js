export default {
  id: 'strategy-01',
  level: 3,
  title: 'A Estratégia de Combate',
  dungeon: 'Castelo do Dragão',
  xp: 150,
  narrative: `
Diante do Dragão, o herói precisava trocar de estratégia em tempo real:
atacar quando o dragão estava fraco, defender quando estava com fúria,
e fugir quando a vida estava baixa.
"O comportamento deve ser encapsulado e intercambiável," disse o oráculo.
  `,
  theory: `
## Strategy Pattern
**"Define uma família de algoritmos, encapsula cada um e os torna intercambiáveis."**

Permite trocar o comportamento de um objeto em tempo de execução
sem alterar a classe que o usa.
  `,
  starterCode: `// TODO: Crie 3 estratégias: AttackStrategy, DefendStrategy, FleeStrategy
// Cada uma com método execute() retornando string descrevendo a ação.
// Crie Hero com:
//   - construtor que aceita uma strategy
//   - método setStrategy(strategy) para trocar em runtime
//   - método act() que delega para strategy.execute()

// export { Hero, AttackStrategy, DefendStrategy, FleeStrategy }
`,
  starterCodeTS: `// TODO: Crie 3 estratégias: AttackStrategy, DefendStrategy, FleeStrategy
// Cada uma com método execute(): string.
// Crie Hero com:
//   - construtor que aceita uma strategy: CombatStrategy
//   - método setStrategy(strategy: CombatStrategy): void
//   - método act(): string que delega para strategy.execute()

interface CombatStrategy {
  execute(): string;
}

// export { Hero, AttackStrategy, DefendStrategy, FleeStrategy }
`,
  tests: [
    {
      name: 'Hero.act() usa a estratégia atual',
      fn: ({ Hero, AttackStrategy }) => {
        if (!Hero) throw new Error('Hero não exportado')
        if (!AttackStrategy) throw new Error('AttackStrategy não exportada')
        const hero = new Hero(new AttackStrategy())
        const result = hero.act()
        if (typeof result !== 'string') throw new Error('act() deve retornar string')
      }
    },
    {
      name: 'Hero pode trocar estratégia em runtime',
      fn: ({ Hero, AttackStrategy, DefendStrategy }) => {
        if (!DefendStrategy) throw new Error('DefendStrategy não exportada')
        const hero = new Hero(new AttackStrategy())
        hero.setStrategy(new DefendStrategy())
        const result = hero.act()
        if (typeof result !== 'string') throw new Error('act() após setStrategy deve retornar string')
      }
    },
    {
      name: 'Cada estratégia retorna ação diferente',
      fn: ({ Hero, AttackStrategy, DefendStrategy, FleeStrategy }) => {
        if (!FleeStrategy) throw new Error('FleeStrategy não exportada')
        const hero = new Hero(new AttackStrategy())
        const attack = hero.act()
        hero.setStrategy(new DefendStrategy())
        const defend = hero.act()
        hero.setStrategy(new FleeStrategy())
        const flee = hero.act()
        if (attack === defend || defend === flee) throw new Error('Cada estratégia deve retornar ação diferente')
      }
    },
  ]
}
