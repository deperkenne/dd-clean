import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
