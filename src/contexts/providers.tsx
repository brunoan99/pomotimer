"use client"

import { ThemeProvider } from "@/contexts/theme-provider"
import { TimeProvider } from "@/contexts/time-provider"

function Providers ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TimeProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme='system'
        enableSystem
      >
        {children}
      </ThemeProvider>
    </TimeProvider>
  )
}

export { Providers }
