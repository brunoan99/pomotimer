import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Providers } from '@/contexts/providers'
import { cn } from '@/lib/utils'

const fontSans = FontSans({ subsets: ['latin'], variable: "--font-sans" })

export const metadata: Metadata = {
  title: 'PomoTimer',
  description: ' A pomodoro timer, in a minimalist aspect.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg" href="/assets/images/clock.svg" />
      </head>
      <body className={cn(
        fontSans.variable,
        "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
