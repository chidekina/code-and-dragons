export default {
  id: 'srp-01',
  level: 1,
  title: 'A Espada do Ferreiro',
  dungeon: 'Caverna do Ferreiro',
  xp: 50,
  narrative: `
O herói chegou à forja de Aldric, o ferreiro. Mas algo estava errado...
Aldric forjava, temperava, vendia E entregava as espadas sozinho.
Quando pedidos aumentaram, tudo quebrou — ele esquecia etapas, misturava ordens.
"Mestre Aldric," disse o herói, "você precisa de ajuda. Cada pessoa deve ter uma responsabilidade."
  `,
  theory: `
## Single Responsibility Principle (SRP)
**"Uma classe deve ter um único motivo para mudar."**

Quando uma classe faz muitas coisas, qualquer mudança em uma responsabilidade pode quebrar as outras.
A solução é separar responsabilidades em classes distintas.
  `,
  starterCode: `// A classe Blacksmith faz tudo — forjar, temperar e vender.
// TODO: Separe em 3 classes: Blacksmith (forja), Temperer (tempera), Merchant (vende)

class Blacksmith {
  forge(material) { return \`\${material} forjado\`; }
  temper(blade) { return \`\${blade} temperado\`; }
  sell(item) { return \`\${item} vendido por 10 moedas\`; }
}

// Exporte as 3 classes para os testes funcionarem:
// export { Blacksmith, Temperer, Merchant }
`,
  starterCodeTS: `// A classe Blacksmith faz tudo — forjar, temperar e vender.
// TODO: Separe em 3 classes: Blacksmith (forja), Temperer (tempera), Merchant (vende)

class Blacksmith {
  forge(material: string): string { return \`\${material} forjado\`; }
  temper(blade: string): string { return \`\${blade} temperado\`; }
  sell(item: string): string { return \`\${item} vendido por 10 moedas\`; }
}

// Exporte as 3 classes para os testes funcionarem:
// export { Blacksmith, Temperer, Merchant }
`,
  tests: [
    {
      name: 'Blacksmith só forja',
      fn: ({ Blacksmith }) => {
        if (typeof Blacksmith === 'undefined') throw new Error('Blacksmith não exportado')
        const b = new Blacksmith()
        if (typeof b.forge !== 'function') throw new Error('Blacksmith deve ter método forge()')
        if (typeof b.temper === 'function') throw new Error('Blacksmith NÃO deve ter método temper()')
        if (typeof b.sell === 'function') throw new Error('Blacksmith NÃO deve ter método sell()')
      }
    },
    {
      name: 'Temperer só tempera',
      fn: ({ Temperer }) => {
        if (typeof Temperer === 'undefined') throw new Error('Temperer não exportado')
        const t = new Temperer()
        if (typeof t.temper !== 'function') throw new Error('Temperer deve ter método temper()')
        if (typeof t.forge === 'function') throw new Error('Temperer NÃO deve ter método forge()')
      }
    },
    {
      name: 'Merchant só vende',
      fn: ({ Merchant }) => {
        if (typeof Merchant === 'undefined') throw new Error('Merchant não exportado')
        const m = new Merchant()
        if (typeof m.sell !== 'function') throw new Error('Merchant deve ter método sell()')
        if (typeof m.forge === 'function') throw new Error('Merchant NÃO deve ter método forge()')
      }
    },
  ]
}
