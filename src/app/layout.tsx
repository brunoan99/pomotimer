import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../styles/globals.css'
import { cn } from "@/lib/utils"

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
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme='system'
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
