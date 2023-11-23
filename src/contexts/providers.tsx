"use client"

import dynamic from "next/dynamic"
const ThemeProvider = dynamic(() => import('./theme-provider'), { ssr: false })
import { TimeProvider } from "@/contexts/time-provider"

function Providers ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme={false}
      enableSystem
    >
      <TimeProvider>
          {children}
      </TimeProvider>
    </ThemeProvider>
  )
}

export { Providers }
