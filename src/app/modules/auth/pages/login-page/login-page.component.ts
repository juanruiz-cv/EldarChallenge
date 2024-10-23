import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Router, RouterModule } from '@angular/router';
import { AuthenticateService } from '@services/firebase-auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    RouterModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseAuth: AuthenticateService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    this.firebaseAuth
      .login(username, password)
      .then((data) => {
        localStorage.setItem('isLoggedIn', 'true');
        console.log('SUCCESS', data);
        this.router.navigateByUrl('/home');
        //this.firebaseAuth.isAuthenticated();
      })
      .catch(({ code }) => {
        console.log('ERROR', code);
      });
  }
}
