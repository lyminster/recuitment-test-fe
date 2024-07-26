import { Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'employee-list',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (c) => c.EmployeeListComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employee-detail/:username',
    loadComponent: () =>
      import('./pages/employee-detail/employee-detail.component').then(
        (c) => c.EmployeeDetailComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-employee',
    loadComponent: () =>
      import('./pages/add-employee/add-employee.component').then(
        (c) => c.AddEmployeeComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'edit-employee/:username',
    loadComponent: () =>
      import('./pages/add-employee/add-employee.component').then(
        (c) => c.AddEmployeeComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent,
      ),
  },
];
