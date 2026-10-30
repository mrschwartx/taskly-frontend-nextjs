import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { AppProviders } from '@/app/AppProviders'
import { createQueryClient } from '@/app/queryClient'
import { ThemeToggle } from './ThemeToggle'
import { themeStore } from './themeStore'

describe('ThemeToggle', () => {
  beforeEach(() => {
    themeStore.setPreference('light')
  })

  it('switches between light and dark mode', async () => {
    const user = userEvent.setup()
    render(
      <AppProviders queryClient={createQueryClient({ retry: false })}>
        <ThemeToggle />
      </AppProviders>,
    )

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
