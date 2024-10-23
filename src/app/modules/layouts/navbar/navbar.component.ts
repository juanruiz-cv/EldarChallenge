import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthenticateService } from '@services/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
    private firebaseAuth: AuthenticateService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
    ];
  }

  logout() {
    this.firebaseAuth.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
