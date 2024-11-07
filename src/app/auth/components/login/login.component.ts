import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  constructor(){

    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
    
   }
  
  ngOnInit(): void {
    
    login(form:NgForm){
      
      const user = form.value.user;
      const pass = form.value.pass;

    }
  }

}
function login(form: any, NgForm: typeof NgForm) {
  throw new Error('Function not implemented.');
}

