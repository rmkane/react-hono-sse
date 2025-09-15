interface CounterCardProps {
  count: number
  setCount: (count: number) => void
}

export const CounterCard = ({ count, setCount }: CounterCardProps) => {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md transition-colors dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Counter Demo</h2>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600"
      >
        count is {count}
      </button>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Edit{' '}
        <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200">
          src/App.tsx
        </code>{' '}
        and save to test HMR
      </p>
    </div>
  )
}
