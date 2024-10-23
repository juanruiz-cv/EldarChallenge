import { Routes } from '@angular/router';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { HomePageComponent } from '@main/pages/home-page/home-page.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '/',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
    ],
  },
];
