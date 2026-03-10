export default {
  id: 'dip-01',
  level: 1,
  title: 'A Dependência do Herói',
  dungeon: 'Caverna do Ferreiro',
  xp: 75,
  narrative: `
O herói sempre carregava uma LightSword específica. Quando ela quebrou,
ele ficou indefeso — seu código dependia de uma implementação concreta.
O sábio disse: "Dependa de abstrações, não de implementações concretas."
  `,
  theory: `
## Dependency Inversion Principle (DIP)
**"Dependa de abstrações, não de implementações."**

Classes de alto nível não devem depender de classes de baixo nível.
Ambas devem depender de abstrações (interfaces/classes base).
  `,
  starterCode: `// O Hero depende diretamente de LightSword — ruim!
// TODO: Faça Hero depender de uma abstração Weapon.
// Crie a classe base Weapon com método attack().
// Crie LightSword e HeavySword que estendem Weapon.
// Hero recebe qualquer Weapon no construtor.

class LightSword {
  attack() { return 'Ataque leve: 10 dano'; }
}

class Hero {
  constructor() {
    this.weapon = new LightSword(); // dependência concreta!
  }
  fight() { return this.weapon.attack(); }
}

// export { Weapon, LightSword, HeavySword, Hero }
`,
  tests: [
    {
      name: 'Hero aceita qualquer Weapon no construtor',
      fn: ({ Weapon, LightSword, Hero }) => {
        if (!Hero) throw new Error('Hero não exportado')
        if (!LightSword) throw new Error('LightSword não exportada')
        const sword = new LightSword()
        const hero = new Hero(sword)
        if (typeof hero.fight !== 'function') throw new Error('Hero deve ter método fight()')
      }
    },
    {
      name: 'LightSword e HeavySword estendem Weapon',
      fn: ({ Weapon, LightSword, HeavySword }) => {
        if (!Weapon) throw new Error('Weapon não exportada')
        if (!LightSword) throw new Error('LightSword não exportada')
        if (!HeavySword) throw new Error('HeavySword não exportada')
        if (!(new LightSword() instanceof Weapon)) throw new Error('LightSword deve estender Weapon')
        if (!(new HeavySword() instanceof Weapon)) throw new Error('HeavySword deve estender Weapon')
      }
    },
    {
      name: 'Hero.fight() usa a arma injetada',
      fn: ({ HeavySword, Hero }) => {
        if (!HeavySword) throw new Error('HeavySword não exportada')
        const heavy = new HeavySword()
        const hero = new Hero(heavy)
        const result = hero.fight()
        if (typeof result !== 'string') throw new Error('fight() deve retornar string')
      }
    },
  ]
}
