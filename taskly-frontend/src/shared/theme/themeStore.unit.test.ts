import { beforeEach, describe, expect, it } from 'vitest'
import { THEME_STORAGE_KEY } from './constants'
import { themeStore } from './themeStore'

describe('themeStore', () => {
  beforeEach(() => {
    themeStore.setPreference('light')
  })

  it('applies the dark class and color scheme when switching to dark', () => {
    themeStore.setPreference('dark')

    expect(themeStore.getResolved()).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe('dark')
  })

  it('persists the preference', () => {
    themeStore.setPreference('dark')

    expect(JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY) ?? 'null')).toBe('dark')
  })

  it('toggles between light and dark', () => {
    themeStore.toggle()
    expect(themeStore.getResolved()).toBe('dark')

    themeStore.toggle()
    expect(themeStore.getResolved()).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('resolves the system preference to light when the media query does not match', () => {
    themeStore.setPreference('system')

    expect(themeStore.getPreference()).toBe('system')
    expect(themeStore.getResolved()).toBe('light')
  })

  it('notifies subscribers on change', () => {
    let calls = 0
    const unsubscribe = themeStore.subscribe(() => {
      calls += 1
    })

    themeStore.setPreference('dark')
    unsubscribe()
    themeStore.setPreference('light')

    expect(calls).toBe(1)
  })
})
