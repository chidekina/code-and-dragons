import srp01 from './level1/srp-01.js'
import srp02 from './level1/srp-02.js'
import ocp01 from './level1/ocp-01.js'
import dip01 from './level1/dip-01.js'
import lsp01 from './level2/lsp-01.js'
import factory01 from './level2/factory-01.js'
import inheritance01 from './level2/inheritance-01.js'
import polymorphism01 from './level2/polymorphism-01.js'
import encapsulation01 from './level2/encapsulation-01.js'
import abstraction01 from './level2/abstraction-01.js'
import strategy01 from './level3/strategy-01.js'
import observer01 from './level3/observer-01.js'
import decorator01 from './level3/decorator-01.js'

export const lessons = [
  srp01, srp02, ocp01, dip01,
  lsp01, factory01, inheritance01, polymorphism01, encapsulation01, abstraction01,
  strategy01, observer01, decorator01,
]

export function getLessonById(id) {
  return lessons.find(l => l.id === id)
}

export function getLevelLessons(level) {
  return lessons.filter(l => l.level === level)
}
