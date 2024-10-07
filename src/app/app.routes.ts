import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Usamos el layout como el contenedor principal
    children: [
      {
        path: '', // Ruta vacía carga por defecto el DashboardComponent
        loadComponent: () =>
          import('./dashboard/components/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            m => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/components/register/register.component').then(
            m => m.RegisterComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/components/dashboard/dashboard.component').then(
            m => m.DashboardComponent
          ),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import(
            './patients/components/patient-list/patient-list.component'
          ).then(m => m.PatientListComponent),
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import(
            './patients/components/patient-details/patient-details.component'
          ).then(m => m.PatientDetailsComponent),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import(
            './appointments/components/appointment-list/appointment-list.component'
          ).then(m => m.AppointmentListComponent),
      },
      {
        path: 'appointments/:id',
        loadComponent: () =>
          import(
            './appointments/components/appointment-details/appointment-details.component'
          ).then(m => m.AppointmentDetailsComponent),
      },
      {
        path: 'billing',
        loadComponent: () =>
          import(
            './billing/components/billing-list/billing-list.component'
          ).then(m => m.BillingListComponent),
      },
      {
        path: 'billing/:id',
        loadComponent: () =>
          import(
            './billing/components/billing-details/billing-details.component'
          ).then(m => m.BillingDetailsComponent),
      },
      {
        path: 'liquidation',
        loadComponent: () =>
          import(
            './liquidation/components/liquidation-list/liquidation-list.component'
          ).then(m => m.LiquidationListComponent),
      },
      {
        path: 'liquidation/:id',
        loadComponent: () =>
          import(
            './liquidation/components/liquidation-details/liquidation-details.component'
          ).then(m => m.LiquidationDetailsComponent),
      },
    ],
  },
  // Redirección cuando la ruta está vacía (path: '')
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full', // Usa 'full' para redirigir solo cuando la URL está vacía
  },
  // Redirección para rutas no encontradas
  {
    path: '**',
    redirectTo: '/404',
  },
];
