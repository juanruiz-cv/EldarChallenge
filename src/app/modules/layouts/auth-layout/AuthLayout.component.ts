import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './AuthLayout.component.html',
  styleUrl: './AuthLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
