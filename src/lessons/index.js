import srp01 from './level1/srp-01.js'
import srp02 from './level1/srp-02.js'
import ocp01 from './level1/ocp-01.js'

export const lessons = [srp01, srp02, ocp01]

export function getLessonById(id) {
  return lessons.find(l => l.id === id)
}

export function getLevelLessons(level) {
  return lessons.filter(l => l.level === level)
}
