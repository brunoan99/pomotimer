import '../styles/globals.css'
import type { Metadata } from 'next'
import { cn } from "@/lib/utils"
import { Inter as FontSans } from 'next/font/google'
import { Providers } from '@/contexts/providers'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/svg"
          href="/assets/images/clock.svg"
          sizes="any"
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable)}
      >
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
