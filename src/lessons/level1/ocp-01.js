export default {
  id: 'ocp-01',
  level: 1,
  title: 'O Arsenal do Herói',
  dungeon: 'Caverna do Ferreiro',
  xp: 75,
  narrative: `
O herói precisava de um sistema de armas. O armeiro tinha um único método
que usava if/else para cada tipo de arma. Cada nova arma exigia modificar o código.
"Aberto para extensão, fechado para modificação," disse o herói.
  `,
  theory: `
## Open/Closed Principle (OCP)
**"Entidades devem ser abertas para extensão, mas fechadas para modificação."**

Em vez de if/else para cada variante, crie uma interface comum e estenda com novas classes.
  `,
  starterCode: `// O método attack() usa if/else para cada arma — ruim!
// TODO: Crie uma classe base Weapon com método attack()
// e estenda com Sword, Bow e MagicStaff sem modificar a classe base.

class ArsenalBad {
  attack(weaponType) {
    if (weaponType === 'sword') return 'Corte com espada: 20 dano';
    if (weaponType === 'bow') return 'Flecha: 15 dano';
    if (weaponType === 'staff') return 'Magia: 30 dano';
  }
}

// export { Weapon, Sword, Bow, MagicStaff }
`,
  starterCodeTS: `// O método attack() usa if/else para cada arma — ruim!
// TODO: Crie uma classe base Weapon com método attack()
// e estenda com Sword, Bow e MagicStaff sem modificar a classe base.

class ArsenalBad {
  attack(weaponType: string): string {
    if (weaponType === 'sword') return 'Corte com espada: 20 dano';
    if (weaponType === 'bow') return 'Flecha: 15 dano';
    if (weaponType === 'staff') return 'Magia: 30 dano';
    return '';
  }
}

// export { Weapon, Sword, Bow, MagicStaff }
`,
  tests: [
    {
      name: 'Sword estende Weapon e retorna dano',
      fn: ({ Weapon, Sword }) => {
        if (!Sword) throw new Error('Sword não exportado')
        const s = new Sword()
        if (!(s instanceof Weapon)) throw new Error('Sword deve estender Weapon')
        const result = s.attack()
        if (typeof result !== 'string') throw new Error('attack() deve retornar string')
      }
    },
    {
      name: 'Bow estende Weapon e retorna dano',
      fn: ({ Bow, Weapon }) => {
        if (!Bow) throw new Error('Bow não exportado')
        const b = new Bow()
        if (!(b instanceof Weapon)) throw new Error('Bow deve estender Weapon')
      }
    },
    {
      name: 'MagicStaff estende Weapon e retorna dano',
      fn: ({ MagicStaff, Weapon }) => {
        if (!MagicStaff) throw new Error('MagicStaff não exportado')
        const ms = new MagicStaff()
        if (!(ms instanceof Weapon)) throw new Error('MagicStaff deve estender Weapon')
      }
    },
  ]
}
