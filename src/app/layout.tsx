import "./globals.css"
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { KeyIdProvider } from "@/store/keyId"
import { ContractIdProvider } from "@/store/contractId"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Project Stellar - Your Digital Identity in the Stellar Network",
  description:
    "Project Stellar creates a secure digital wallet that works as your decentralized ID, with real-world asset verification and loyalty programs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <KeyIdProvider>
            <ContractIdProvider>
              {children}
            </ContractIdProvider>
          </KeyIdProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
