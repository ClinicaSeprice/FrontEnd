import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Usamos el layout como el contenedor principal
    children: [
      {
        path: '', // Ruta vacía carga por defecto el LoginComponent
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            m => m.LoginComponent
          ),
          canActivate: [AuthenticatedGuard]
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/components/login/login.component').then(
            m => m.LoginComponent
          ),
          canActivate: [AuthenticatedGuard]
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
          canActivate: [AuthGuard]
      },
      {
        path: 'patients',
        loadComponent: () =>
          import(
            './patients/components/patient-list/patient-list.component'
          ).then(m => m.PatientListComponent),
          canActivate: [AuthGuard]
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import(
            './patients/components/patient-details/patient-details.component'
          ).then(m => m.PatientDetailsComponent),
          canActivate: [AuthGuard]
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import(
            './appointments/components/appointment-list/appointment-list.component'
          ).then(m => m.AppointmentListComponent),
          canActivate: [AuthGuard]
      },
      {
        path: 'appointments/:id',
        loadComponent: () =>
          import(
            './appointments/components/appointment-details/appointment-details.component'
          ).then(m => m.AppointmentDetailsComponent),
          canActivate: [AuthGuard]
      },      {
        path: 'billing',
        loadComponent: () =>
          import(
            './billing/components/billing-list/billing-list.component'
          ).then(m => m.BillingListComponent),
          canActivate: [AuthGuard]
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
