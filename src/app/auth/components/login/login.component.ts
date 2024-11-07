import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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

    this.authService.login(user, pass).subscribe(
      res => {
        const token = res.token; 
        console.log('Token recibido:', token);

        this.authService.saveToken(JSON.stringify(token)); // Guarda el token en localStorage
        // Lógica adicional en caso de éxito, como redireccionar
      },
      error => {
        console.error('Error en la autenticación', error);
        // Manejo de error, como mostrar un mensaje
      }
    );
  }
}