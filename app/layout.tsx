import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AppProvider } from "@/components/providers/app-provider"
import { NavigationBar } from "@/components/navigation/navigation-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FlowMind - Adaptive Routine Generator",
  description: "Personalized routine generator that adapts to your preferences and personality",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AppProvider>
            <div className="min-h-screen flex flex-col gradient-bg">
              <NavigationBar />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster position="top-right" />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'