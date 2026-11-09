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
  // Espaces connectés : une route par rôle, protégée par RequireRole (rôles lus dans le jeton).
  {
    lazy: () =>
      import('@/features/auth/RequireRole').then((m) => ({
        Component: () => <m.RequireRole roles={['SECRETARY']} />,
      })),
    children: [
      {
        path: '/dashboard/secretary',
        lazy: () =>
          import('@/features/dashboard/secretary/SecretaryLayout').then((m) => ({ Component: m.SecretaryLayout })),
        children: [
          {
            index: true,
            lazy: () =>
              import('@/features/dashboard/secretary/SecretaryDashboardPage').then((m) => ({
                Component: m.SecretaryDashboardPage,
              })),
          },
          {
            path: 'planning',
            lazy: () =>
              import('@/features/dashboard/secretary/planning/PlanningPage').then((m) => ({
                Component: m.PlanningPage,
              })),
          },
          {
            path: 'agents',
            lazy: () =>
              import('@/features/dashboard/secretary/agents/AgentsPage').then((m) => ({ Component: m.AgentsPage })),
          },
          {
            path: 'properties/:propertyId',
            lazy: () =>
              import('@/features/dashboard/secretary/propertyDetail/PropertyDetailPage').then((m) => ({
                Component: m.PropertyDetailPage,
              })),
          },
          {
            path: 'jobs/:jobId',
            lazy: () =>
              import('@/features/dashboard/secretary/jobDetail/JobDetailPage').then((m) => ({
                Component: m.JobDetailPage,
              })),
          },
        ],
      },
    ],
  },
  // Espace client : chaque CUSTOMER n'y voit que ses données (filtrées par le back-end via le jeton).
  {
    lazy: () =>
      import('@/features/auth/RequireRole').then((m) => ({
        Component: () => <m.RequireRole roles={['CUSTOMER']} />,
      })),
    children: [
      {
        path: '/dashboard/customer',
        lazy: () =>
          import('@/features/dashboard/customer/CustomerLayout').then((m) => ({ Component: m.CustomerLayout })),
        children: [
          {
            index: true,
            lazy: () =>
              import('@/features/dashboard/customer/CustomerDashboardPage').then((m) => ({
                Component: m.CustomerDashboardPage,
              })),
          },
          {
            path: 'reservations',
            lazy: () =>
              import('@/features/dashboard/customer/reservations/CustomerReservationsPage').then((m) => ({
                Component: m.CustomerReservationsPage,
              })),
          },
          {
            path: 'reservations/:date',
            lazy: () =>
              import('@/features/dashboard/customer/reservations/DepartureDayPage').then((m) => ({
                Component: m.DepartureDayPage,
              })),
          },
          {
            path: 'owners',
            lazy: () =>
              import('@/features/dashboard/customer/owners/CustomerOwnersPage').then((m) => ({
                Component: m.CustomerOwnersPage,
              })),
          },
          {
            path: 'owners/:ownerId/invoices',
            lazy: () =>
              import('@/features/dashboard/customer/invoices/OwnerInvoicesPage').then((m) => ({
                Component: m.OwnerInvoicesPage,
              })),
          },
          {
            path: 'properties',
            lazy: () =>
              import('@/features/dashboard/customer/properties/CustomerPropertiesPage').then((m) => ({
                Component: m.CustomerPropertiesPage,
              })),
          },
          {
            path: 'agents',
            lazy: () =>
              import('@/features/dashboard/customer/agents/CustomerAgentsPage').then((m) => ({
                Component: m.CustomerAgentsPage,
              })),
          },
          {
            path: 'agents/new',
            lazy: () =>
              import('@/features/dashboard/customer/createAgent/CreateAgentPage').then((m) => ({
                Component: m.CreateAgentPage,
              })),
          },
          {
            path: 'owners/new',
            lazy: () =>
              import('@/features/dashboard/customer/createOwner/CreateOwnerPage').then((m) => ({
                Component: m.CreateOwnerPage,
              })),
          },
        ],
      },
    ],
  },
  // Espace agent de ménage : chaque AGENT n'y voit que ses logements (filtrés par le back-end via le jeton).
  {
    lazy: () =>
      import('@/features/auth/RequireRole').then((m) => ({
        Component: () => <m.RequireRole roles={['AGENT']} />,
      })),
    children: [
      {
        path: '/dashboard/agent',
        lazy: () => import('@/features/dashboard/agent/AgentLayout').then((m) => ({ Component: m.AgentLayout })),
        children: [
          {
            index: true,
            lazy: () =>
              import('@/features/dashboard/agent/AgentHomePage').then((m) => ({ Component: m.AgentHomePage })),
          },
        ],
      },
    ],
  },
  // ADMIN n'a pas encore son espace : page « à venir », tout compte connecté.
  {
    lazy: () => import('@/features/auth/RequireRole').then((m) => ({ Component: m.RequireRole })),
    children: [
      {
        path: '/coming-soon',
        lazy: () => import('@/features/dashboard/ComingSoonPage').then((m) => ({ Component: m.ComingSoonPage })),
      },
    ],
  },
])
