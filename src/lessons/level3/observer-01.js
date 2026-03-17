export default {
  id: 'observer-01',
  level: 3,
  title: 'A Rede de Espiões',
  dungeon: 'Taverna do Corvo Negro',
  xp: 140,
  narrative: `
Na Taverna do Corvo Negro, o Espião-Mestre enviava alertas para toda a sua rede.
Quando um dragão era avistado, cada espião reagia de forma diferente:
o arqueiro preparava flechas, o curandeiro preparava poções, o mensageiro saía correndo.
"Você não precisa chamar cada um manualmente," disse o espião-mestre.
"Eles se registram. Você apenas notifica."
  `,
  theory: `
## Observer Pattern

**"Define uma dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados automaticamente."**

Composto por:
- **Subject (EventEmitter):** mantém lista de observers e os notifica
- **Observer:** interface com método \`update(data)\`

Usado em sistemas de eventos, notificações, reatividade.

\`\`\`js
class EventBus {
  #observers = []
  subscribe(obs) { this.#observers.push(obs) }
  unsubscribe(obs) { this.#observers = this.#observers.filter(o => o !== obs) }
  notify(data) { this.#observers.forEach(o => o.update(data)) }
}
\`\`\`
  `,
  starterCode: `// TODO: Crie a classe SpyNetwork (o Subject) com:
//   - subscribe(observer) — registra um observer
//   - unsubscribe(observer) — remove um observer
//   - notify(event) — chama update(event) em todos os observers registrados
//   - getObserverCount() — retorna número de observers registrados
//
// Crie 3 observers concretos, cada um com método update(event):
//   ArcherObserver  — reage ao evento preparando flechas
//   HealerObserver  — reage preparando poções
//   MessengerObserver — reage saindo correndo
//
// Cada update() deve armazenar o último evento em this.lastEvent
// e retornar string descrevendo a reação

// export { SpyNetwork, ArcherObserver, HealerObserver, MessengerObserver }
`,
  starterCodeTS: `// TODO: Crie a interface Observer com método update(event: string): string
// Crie SpyNetwork com:
//   - subscribe(observer: Observer): void
//   - unsubscribe(observer: Observer): void
//   - notify(event: string): void
//   - getObserverCount(): number
//
// Crie ArcherObserver, HealerObserver, MessengerObserver — implementam Observer
// Cada update() guarda o evento em this.lastEvent e retorna string de reação

// export { SpyNetwork, ArcherObserver, HealerObserver, MessengerObserver }
`,
  tests: [
    {
      name: 'SpyNetwork notifica todos os observers',
      fn: ({ SpyNetwork, ArcherObserver, HealerObserver, MessengerObserver }) => {
        if (!SpyNetwork) throw new Error('SpyNetwork não exportado')
        if (!ArcherObserver) throw new Error('ArcherObserver não exportado')
        const network = new SpyNetwork()
        const archer = new ArcherObserver()
        const healer = new HealerObserver()
        const messenger = new MessengerObserver()
        network.subscribe(archer)
        network.subscribe(healer)
        network.subscribe(messenger)
        network.notify('Dragão avistado ao norte!')
        if (archer.lastEvent !== 'Dragão avistado ao norte!') throw new Error('ArcherObserver deve receber o evento')
        if (healer.lastEvent !== 'Dragão avistado ao norte!') throw new Error('HealerObserver deve receber o evento')
        if (messenger.lastEvent !== 'Dragão avistado ao norte!') throw new Error('MessengerObserver deve receber o evento')
      }
    },
    {
      name: 'subscribe aumenta contagem de observers',
      fn: ({ SpyNetwork, ArcherObserver }) => {
        const network = new SpyNetwork()
        if (network.getObserverCount() !== 0) throw new Error('Deve começar com 0 observers')
        network.subscribe(new ArcherObserver())
        network.subscribe(new ArcherObserver())
        if (network.getObserverCount() !== 2) throw new Error('Deve ter 2 observers após 2 subscribes')
      }
    },
    {
      name: 'unsubscribe remove observer da rede',
      fn: ({ SpyNetwork, ArcherObserver, HealerObserver }) => {
        const network = new SpyNetwork()
        const archer = new ArcherObserver()
        const healer = new HealerObserver()
        network.subscribe(archer)
        network.subscribe(healer)
        network.unsubscribe(archer)
        network.notify('Teste')
        if (archer.lastEvent === 'Teste') throw new Error('Observer removido não deve receber eventos')
        if (healer.lastEvent !== 'Teste') throw new Error('Observer ainda inscrito deve receber o evento')
      }
    },
    {
      name: 'Cada observer reage de forma diferente',
      fn: ({ SpyNetwork, ArcherObserver, HealerObserver, MessengerObserver }) => {
        const network = new SpyNetwork()
        const archer = new ArcherObserver()
        const healer = new HealerObserver()
        const messenger = new MessengerObserver()
        network.subscribe(archer)
        network.subscribe(healer)
        network.subscribe(messenger)
        network.notify('Alarme')
        const reactions = [archer.lastEvent, healer.lastEvent, messenger.lastEvent]
        // Todos devem ter recebido o mesmo evento
        if (!reactions.every(r => r === 'Alarme')) throw new Error('Todos devem receber o mesmo evento')
      }
    },
  ]
}
