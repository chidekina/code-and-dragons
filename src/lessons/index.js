import srp01 from './level1/srp-01.js'
import srp02 from './level1/srp-02.js'
import ocp01 from './level1/ocp-01.js'
import dip01 from './level1/dip-01.js'
import lsp01 from './level2/lsp-01.js'
import factory01 from './level2/factory-01.js'
import strategy01 from './level3/strategy-01.js'

export const lessons = [srp01, srp02, ocp01, dip01, lsp01, factory01, strategy01]

export function getLessonById(id) {
  return lessons.find(l => l.id === id)
}

export function getLevelLessons(level) {
  return lessons.filter(l => l.level === level)
}
