import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential, // <-- Asegúrate de tener UserCredential aquí
  User,
  user,
} from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { tap, map } from 'rxjs/operators'; // Cambiamos switchMap por tap y map si es necesario

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  private saveUserToken(user: User): Observable<void> {
    // Ahora retorna Observable<void> o Promise<void>
    if (user) {
      // get id token fuerza la obtención del token actual, y lo refresca si es necesario
      return from(user.getIdToken()).pipe(
        tap((token) => {
          localStorage.setItem('token', token);
          localStorage.setItem('currentUserUid', user.uid);
        }),
        map(() => void 0) // Mapea a void para no cambiar el tipo del observable principal
      );
    }
    return of(void 0); // Retorna un observable vacío que completa con void
  }

  private clearUserToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUserUid');
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((res) => {
        // Ejecuta el guardado del token como un efecto secundario.
        // No necesitamos que cambie el valor emitido por el Observable principal.
        this.saveUserToken(res.user).subscribe();
      })
    );
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((res) => {
        this.saveUserToken(res.user).subscribe();
      })
    );
  }

  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      tap((res) => {
        this.saveUserToken(res.user).subscribe();
      })
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(tap(() => this.clearUserToken()));
  }

  get user$(): Observable<User | null> {
    return user(this.auth);
  }
}
