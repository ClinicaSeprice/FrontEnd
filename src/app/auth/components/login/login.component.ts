import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private toastr = inject(ToastrService);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {    
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

  }

  login(): void {
    const user = this.loginForm.get('user')?.value;
    const pass = this.loginForm.get('pass')?.value;

    this.authService.login(user, pass).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        //this.toastr.success(`Bienvenido/a: ${user}`, 'Inicio de sesión exitoso');
        //alert('Login correcto para el usuario: ' + user);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Usuario o contraseñas ingresados inválidos', 'Error de autenticación');
      }
    });
  }
}