import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule], 
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <!-- First Name -->
        <div>
          <label [for]="firstNameId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ firstNameLabel }}</label>
          <input [id]="firstNameId" type="text" formControlName="firstName" [placeholder]="firstNamePlaceholder" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        
        <!-- Last Name -->
        <div>
          <label [for]="lastNameId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ lastNameLabel }}</label>
          <input [id]="lastNameId" type="text" formControlName="lastName" [placeholder]="lastNamePlaceholder" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        
        <!-- Email -->
        <div>
          <label [for]="emailId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ emailLabel }}</label>
          <input [id]="emailId" type="email" formControlName="email" [placeholder]="emailPlaceholder" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        
        <!-- Password -->
        <div>
          <label [for]="passwordId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ passwordLabel }}</label>
          <input [id]="passwordId" type="password" formControlName="password" [placeholder]="passwordPlaceholder" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
      </div>

      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  `,
  styles: [``],
})
export class FormComponent {
  @Input() firstNameLabel = 'First Name';
  @Input() firstNamePlaceholder = 'John';
  @Input() firstNameId = 'first_name';

  @Input() lastNameLabel = 'Last Name';
  @Input() lastNamePlaceholder = 'Doe';
  @Input() lastNameId = 'last_name';

  @Input() emailLabel = 'Email Address';
  @Input() emailPlaceholder = 'john.doe@company.com';
  @Input() emailId = 'email';

  @Input() passwordLabel = 'Password';
  @Input() passwordPlaceholder = '•••••••••';
  @Input() passwordId = 'password';

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
    }
  }
}
