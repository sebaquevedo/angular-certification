import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: ['/* Add SCSS styles here */'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log('Reset Password Request:', this.resetPasswordForm.value);
      // Simular envío de enlace de recuperación al backend
    }
  }
}
