import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}