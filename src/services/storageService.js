/**
 * storageService.js
 * All methods are async from day one — even though v1 uses synchronous
 * localStorage underneath. This means calling code (ProgressContext)
 * already awaits these calls, so swapping the implementation for a real
 * network API later requires zero changes outside this file.
 *
 * Schema version + hardcoded userId fields are present from day one
 * so a future migration script has something to detect and key against.
 * (Architecture Doc §5)
 */

const SCHEMA_VERSION = 1
const STORAGE_KEY = 'reactquest_progress'

function getDefaultData() {
  return {
    schemaVersion: SCHEMA_VERSION,
    userId: 'local-user',
    completedLessons: [],
    completedChallenges: [],
  }
}

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultData()
    const parsed = JSON.parse(raw)
    // TODO Phase 3: add schema migration logic if schemaVersion < SCHEMA_VERSION
    return parsed
  } catch {
    return getDefaultData()
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage write failures are non-fatal — progress is best-effort in v1
    console.warn('[storageService] Failed to persist progress to localStorage')
  }
}

export const storageService = {
  async getProgress() {
    return readStore()
  },

  async setLessonComplete(lessonId) {
    const data = readStore()
    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId)
      writeStore(data)
    }
    return data
  },

  async setChallengeComplete(lessonId, checkpointId) {
    const data = readStore()
    if (!data.completedChallenges.includes(checkpointId)) {
      data.completedChallenges.push(checkpointId)
      writeStore(data)
    }
    return data
  },

  async exportProgress() {
    // P2 feature (PRD §7.8) — returns JSON string for download
    return JSON.stringify(readStore(), null, 2)
  },

  async resetProgress() {
    const fresh = getDefaultData()
    writeStore(fresh)
    return fresh
  },
}
