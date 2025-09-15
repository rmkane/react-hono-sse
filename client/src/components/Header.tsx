import { useTheme } from '@/hooks/useTheme'

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className="mb-12 text-center">
      <div className="mb-6 flex items-center justify-center gap-8">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="h-16 w-16 animate-spin" alt="React logo" />
        </a>
      </div>
      <div className="mb-2 flex items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">React + Hono + SSE</h1>
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-gray-200 p-2 text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-600"
          title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300">Real-time communication with Server-Sent Events</p>
    </div>
  )
}
