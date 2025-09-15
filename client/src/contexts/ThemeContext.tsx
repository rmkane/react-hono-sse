import { useEffect, useState, type ReactNode } from 'react'

import { ThemeContext } from '@/contexts/ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDarkMode(mediaQuery.matches)
    }
  }, [])

  useEffect(() => {
    // Update document class and localStorage
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}
