import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import NewsTicker from '@/components/NewsTicker'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { ThemeProvider } from '@/components/ThemeProvider'
import AuthProvider from '@/components/AuthProvider'
import { AuthContextProvider } from '@/components/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevHub Pro - Free Developer Tools & Resources',
  description: 'Access 50+ free developer tools, error solutions, cheatsheets, code playground, and AI prompts. Your complete development toolkit.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <AuthContextProvider>
              <Navigation />
              <NewsTicker />
              <main className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
            </AuthContextProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}