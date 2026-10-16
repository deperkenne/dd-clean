import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { LocaleProvider } from '@/app/LocaleProvider'
import { queryClient } from '@/app/queryClient'
import { router } from '@/app/router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </QueryClientProvider>
  )
}

export default App
