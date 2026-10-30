import { afterEach, describe, expect, it } from 'vitest'
import { THEME_STORAGE_KEY } from './constants'
import { themeInitScript } from './script'

const runScript = () => {
  new Function(themeInitScript)()
}

describe('themeInitScript', () => {
  afterEach(() => {
    document.documentElement.className = ''
    document.documentElement.style.colorScheme = ''
  })

  it('applies the dark class when dark is stored', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify('dark'))

    runScript()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('applies the light class when light is stored', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify('light'))

    runScript()

    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('falls back to the system preference when nothing is stored', () => {
    runScript()

    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('does not throw on corrupted storage', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, '{broken')

    expect(runScript).not.toThrow()
  })
})
