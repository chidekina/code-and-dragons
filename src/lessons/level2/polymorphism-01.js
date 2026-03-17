export default {
  id: 'polymorphism-01',
  level: 2,
  title: 'As Mil Faces do Dragão',
  dungeon: 'Salão das Ilusões',
  xp: 90,
  narrative: `
No Salão das Ilusões, o Dragão Metamorfo assumia diferentes formas.
Às vezes era de gelo, às vezes de fogo, às vezes de sombra.
Mas o herói percebeu: não importava a forma — o dragão sempre atacava.
"O polimorfismo permite tratar objetos diferentes de forma uniforme," sussurrou o oráculo.
"Chame attack() em qualquer criatura — cada uma responde à sua própria maneira."
  `,
  theory: `
## Polimorfismo (Polymorphism)

**"Objetos de tipos diferentes respondem à mesma mensagem de formas distintas."**

Com polimorfismo, podemos chamar o mesmo método em instâncias diferentes e obter
comportamentos específicos de cada subclasse — sem precisar verificar o tipo.

\`\`\`js
class Shape {
  area() { return 0 }
}
class Circle extends Shape {
  area() { return Math.PI * this.r ** 2 }
}
class Square extends Shape {
  area() { return this.side ** 2 }
}
// Uma função genérica funciona para todas:
function printArea(shape) { return shape.area() }
\`\`\`
  `,
  starterCode: `// TODO: Crie a classe base Monster com método attack() → string genérico
// Crie IceMonster extends Monster — attack() retorna algo sobre gelo
// Crie FireMonster extends Monster — attack() retorna algo sobre fogo
// Crie ShadowMonster extends Monster — attack() retorna algo sobre sombra
//
// Crie a função battle(monsters) que recebe um array de Monster
// e retorna array com o resultado de attack() de cada um

// export { Monster, IceMonster, FireMonster, ShadowMonster, battle }
`,
  starterCodeTS: `// TODO: Crie a classe base Monster com método attack(): string
// Crie IceMonster, FireMonster, ShadowMonster — cada uma sobrescreve attack()
//
// Crie a função battle(monsters: Monster[]): string[]
// que retorna array com o resultado de attack() de cada monstro

// export { Monster, IceMonster, FireMonster, ShadowMonster, battle }
`,
  tests: [
    {
      name: 'Cada monstro tem attack() com resposta única',
      fn: ({ IceMonster, FireMonster, ShadowMonster }) => {
        if (!IceMonster) throw new Error('IceMonster não exportado')
        if (!FireMonster) throw new Error('FireMonster não exportado')
        if (!ShadowMonster) throw new Error('ShadowMonster não exportado')
        const ice = new IceMonster().attack()
        const fire = new FireMonster().attack()
        const shadow = new ShadowMonster().attack()
        if (typeof ice !== 'string') throw new Error('IceMonster.attack() deve retornar string')
        if (typeof fire !== 'string') throw new Error('FireMonster.attack() deve retornar string')
        if (typeof shadow !== 'string') throw new Error('ShadowMonster.attack() deve retornar string')
        if (ice === fire || fire === shadow) throw new Error('Cada monstro deve ter ataque único')
      }
    },
    {
      name: 'Subclasses são instâncias de Monster',
      fn: ({ Monster, IceMonster, FireMonster }) => {
        if (!Monster) throw new Error('Monster não exportado')
        if (!(new IceMonster() instanceof Monster)) throw new Error('IceMonster deve ser instância de Monster')
        if (!(new FireMonster() instanceof Monster)) throw new Error('FireMonster deve ser instância de Monster')
      }
    },
    {
      name: 'battle() processa array polimorficamente',
      fn: ({ IceMonster, FireMonster, ShadowMonster, battle }) => {
        if (!battle) throw new Error('battle não exportada')
        const monsters = [new IceMonster(), new FireMonster(), new ShadowMonster()]
        const results = battle(monsters)
        if (!Array.isArray(results)) throw new Error('battle() deve retornar um array')
        if (results.length !== 3) throw new Error('battle() deve retornar um resultado por monstro')
        results.forEach((r, i) => {
          if (typeof r !== 'string') throw new Error(`Resultado ${i} deve ser string`)
        })
      }
    },
    {
      name: 'battle() funciona sem verificar tipo explícito',
      fn: ({ Monster, IceMonster, battle }) => {
        // adiciona um monstro genérico — battle ainda deve funcionar
        const monsters = [new Monster(), new IceMonster()]
        const results = battle(monsters)
        if (results.length !== 2) throw new Error('battle() deve processar qualquer Monster')
      }
    },
  ]
}
