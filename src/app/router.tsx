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
  // Pages d'authentification : sans header ni footer du site, avec leur propre cadre.
  // Chargées à la demande, pour que les visiteurs du site ne téléchargent pas Keycloak.
  {
    path: '/login',
    lazy: () => import('@/features/auth/LoginPage').then((m) => ({ Component: m.LoginPage })),
  },
  {
    path: '/register',
    lazy: () => import('@/features/auth/RegisterPage').then((m) => ({ Component: m.RegisterPage })),
  },
])
