const KEY = 'code-and-dragons-progress'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? { completed: [], xp: 0, savedCode: {} }
  } catch {
    return { completed: [], xp: 0, savedCode: {} }
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function getProgress() {
  return load()
}

export function completeLesson(lessonId, xp) {
  const state = load()
  if (!state.completed.includes(lessonId)) {
    state.completed.push(lessonId)
    state.xp += xp
  }
  save(state)
  return state
}

// Key format: "lessonId:language" — keeps JS and TS code separate
export function saveCode(lessonId, code, language = 'javascript') {
  const state = load()
  state.savedCode[`${lessonId}:${language}`] = code
  save(state)
}

export function getSavedCode(lessonId, language = 'javascript') {
  return load().savedCode[`${lessonId}:${language}`] ?? null
}

export function isCompleted(lessonId) {
  return load().completed.includes(lessonId)
}

export function isUnlocked(lesson, allLessons) {
  if (lesson.id === allLessons[0].id) return true
  const idx = allLessons.findIndex(l => l.id === lesson.id)
  if (idx === 0) return true
  return isCompleted(allLessons[idx - 1].id)
}
