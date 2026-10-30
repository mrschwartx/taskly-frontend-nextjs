import type { Metadata, Viewport } from 'next'
import { themeInitScript } from '@/shared/theme/script'
import { AppProviders } from './AppProviders'
import { NavBar } from './layouts/NavBar'

export const metadata: Metadata = {
  title: 'Taskly',
  description: 'Taskly helps you manage your day and to-do list.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <AppProviders>
          <NavBar />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
