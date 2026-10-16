import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { LandingPage } from '@/features/landing/LandingPage'
import { DatenschutzPage } from '@/features/legal/DatenschutzPage'
import { ImpressumPage } from '@/features/legal/ImpressumPage'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/impressum', element: <ImpressumPage /> },
      { path: '/datenschutz', element: <DatenschutzPage /> },
    ],
  },
])
