import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { AngularFireModule } from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ),
    provideFirestore(() => getFirestore()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
