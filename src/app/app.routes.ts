import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { HomePageComponent } from '@main/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/auth-routing.module').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
    ],
    canActivate: [authGuard],
  },
];
