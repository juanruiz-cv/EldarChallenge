import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@layouts/auth-layout/AuthLayout.component';
import { LoginPageComponent } from '@auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@auth/pages/register-page/register-page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
    ],
  },
];
