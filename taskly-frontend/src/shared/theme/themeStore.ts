import { readJson, writeJson } from '@/shared/lib/storage'
import { THEME_STORAGE_KEY } from './constants'

export type ThemePreference = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const DARK_QUERY = '(prefers-color-scheme: dark)'

type Listener = () => void

const listeners = new Set<Listener>()

const isPreference = (value: unknown): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system'

const readPreference = (): ThemePreference => {
  const stored = readJson<unknown>(THEME_STORAGE_KEY, 'system')
  return isPreference(stored) ? stored : 'system'
}

const prefersDark = () => typeof window !== 'undefined' && window.matchMedia(DARK_QUERY).matches

const resolve = (preference: ThemePreference): ResolvedTheme => {
  if (preference === 'system') {
    return prefersDark() ? 'dark' : 'light'
  }
  return preference
}

let preference: ThemePreference = readPreference()
let resolved: ResolvedTheme = resolve(preference)

const applyToDocument = (theme: ResolvedTheme) => {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.classList.toggle('light', theme === 'light')
  root.style.colorScheme = theme
}

const emit = () => {
  listeners.forEach((listener) => listener())
}

const sync = () => {
  const next = resolve(preference)
  const changed = next !== resolved
  resolved = next
  applyToDocument(resolved)
  if (changed) {
    emit()
  }
}

const setPreference = (next: ThemePreference) => {
  preference = next
  writeJson(THEME_STORAGE_KEY, next)
  resolved = resolve(next)
  applyToDocument(resolved)
  emit()
}

if (typeof window !== 'undefined') {
  applyToDocument(resolved)
  window.matchMedia(DARK_QUERY).addEventListener('change', () => {
    if (preference === 'system') {
      sync()
    }
  })
  window.addEventListener('storage', (event) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      preference = readPreference()
      sync()
      emit()
    }
  })
}

export const themeStore = {
  getPreference: () => preference,
  getResolved: () => resolved,
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  setPreference,
  toggle: () => setPreference(resolved === 'dark' ? 'light' : 'dark'),
}
