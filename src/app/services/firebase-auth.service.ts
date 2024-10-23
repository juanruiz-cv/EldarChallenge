import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  //Inicialización del servicio
  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);

  constructor(private router: Router, private afs: AngularFirestore) {}

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (result) => {
        sendEmailVerification(result.user);
      }
    );
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password).then(
      (result) => {
        if (!result.user.emailVerified) {
          sendEmailVerification(result.user);
          this.logout();
          throw new Error('auth/email-not-verified');
        } else {
          localStorage.setItem('uid', result.user.uid);

          // Manejo del getUserRole
          this.getUserRole(result.user.uid).subscribe(
            (role) => {
              if (role) {
                console.log('User role:', role); // Log para verificar que el rol se obtiene
                // Aquí puedes redirigir o hacer algo con el rol
              } else {
                console.error('El rol no existe o el documento está vacío');
              }
            },
            (error) => {
              console.error('Error al obtener el rol:', error);
            }
          );
        }
      }
    );
  }

  getUserRole(uid: string): Observable<string | null> {
    const userDocRef = this.afs.doc<any>(`users/${uid}`); // Referencia al documento del usuario
    return userDocRef.valueChanges().pipe(
      map((userData) => {
        console.log('USER_ROLE:', userData ? userData.role : null);
        return userData ? userData.role : null; // Devuelve el rol si existe
      })
    );
  }

  logout() {
    localStorage.removeItem('uid');
    localStorage.removeItem('isLoggedIn');
    return this.auth.signOut();
  }

  forgotPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  isAuthenticated(): boolean {
    const user = this.auth.currentUser || localStorage.getItem('isLoggedIn');
    return user !== null;
  }
}
