import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      telefono: ['', [Validators.maxLength(15)]], // Es opcional, por lo que no se requiere Validators.required
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('Registro exitoso manejado en el servicio.');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Error manejado en el servicio:', err);
        },
      });
    } else {
      console.log('Formulario no válido');
      this.registerForm.markAllAsTouched();
    }
  }
}
