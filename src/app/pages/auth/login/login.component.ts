// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import {
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { RouterLink, Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule, RouterLink],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       // console.log('Login Data:', this.loginForm.value);
//       this.router.navigate(['/projects']);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; // Asegúrate que la ruta sea correcta
import { AuthError } from '@angular/fire/auth'; // Importa AuthError de @angular/fire/auth
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null; // Para mostrar errores al usuario
  passwordFieldType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inyecta tu AuthService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Suscribe al estado del usuario. Si ya está logueado, redirige.
    // user$ ahora funciona correctamente gracias a la corrección en AuthService.
    this.authService.user$.subscribe((user) => {
      if (user) {
        // console.log('Usuario ya logueado:', user.email);
        this.router.navigate(['/projects']); // Redirige a tu página principal o dashboard
      }
    });
  }

  // Nuevo método para alternar la visibilidad de la contraseña
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    this.errorMessage = null; // Limpiar errores previos
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llama al método login del AuthService
      this.authService.login(email, password).subscribe({
        next: (res: any) => {
          console.log('Login exitoso:', res.user);
          this.router.navigate(['projects']); // Redirige al dashboard o página principal
        },
        error: (err: AuthError) => {
          // Tipado con AuthError para un mejor manejo
          console.error('Error de login:', err.code, err.message);
          // Mapea los códigos de error de Firebase a mensajes amigables
          switch (err.code) {
            case 'auth/wrong-password':
              this.errorMessage =
                'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
              break;
            case 'auth/user-not-found':
              this.errorMessage =
                'No existe una cuenta con ese correo electrónico.';
              break;
            case 'auth/invalid-email':
              this.errorMessage =
                'El formato del correo electrónico es inválido.';
              break;
            case 'auth/user-disabled':
              this.errorMessage = 'Tu cuenta ha sido deshabilitada.';
              break;
            default:
              this.errorMessage =
                'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
              break;
          }
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.loginForm.markAllAsTouched(); // Marcar para mostrar mensajes de validación
    }
  }

  onRegister(): void {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Llama al método register del AuthService
      this.authService.register(email, password).subscribe({
        next: (res: any) => {
          console.log('Registro exitoso:', res.user);
          this.router.navigate(['/projects']); // O a una página de confirmación, etc.
        },
        error: (err: AuthError) => {
          console.error('Error de registro:', err.code, err.message);
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.errorMessage =
                'Este correo electrónico ya está registrado. Intenta iniciar sesión.';
              break;
            case 'auth/weak-password':
              this.errorMessage =
                'La contraseña es demasiado débil. Necesita al menos 6 caracteres.';
              break;
            case 'auth/invalid-email':
              this.errorMessage =
                'El formato del correo electrónico es inválido.';
              break;
            default:
              this.errorMessage =
                'Error al registrarse. Por favor, inténtalo de nuevo más tarde.';
              break;
          }
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.loginForm.markAllAsTouched();
    }
  }

  onGoogleLogin(): void {
    this.errorMessage = null;
    // Llama al método loginWithGoogle del AuthService
    this.authService.loginWithGoogle().subscribe({
      next: (res: any) => {
        console.log('Login con Google exitoso:', res.user);
        this.router.navigate(['/projects']); // Redirige al dashboard o página principal
      },
      error: (err: any) => {
        console.error('Error de login con Google:', err);
        // Firebase puede retornar un error 'auth/popup-closed-by-user' si el usuario cierra el popup
        if ((err as AuthError).code === 'auth/popup-closed-by-user') {
          this.errorMessage =
            'Se cerró la ventana de Google. Por favor, inténtalo de nuevo.';
        } else {
          this.errorMessage =
            'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.';
        }
      },
    });
  }
}
