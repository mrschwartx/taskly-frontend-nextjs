import { useSyncExternalStore } from 'react'
import { themeStore, type ResolvedTheme, type ThemePreference } from './themeStore'

const getServerPreference = (): ThemePreference => 'system'
const getServerResolved = (): ResolvedTheme => 'light'

export function useTheme() {
  const preference = useSyncExternalStore(themeStore.subscribe, themeStore.getPreference, getServerPreference)
  const resolvedTheme = useSyncExternalStore(themeStore.subscribe, themeStore.getResolved, getServerResolved)

  return {
    preference,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    setPreference: themeStore.setPreference,
    toggle: themeStore.toggle,
  }
}
