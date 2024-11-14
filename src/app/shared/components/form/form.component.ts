import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, NgFor, TitleCasePipe],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of formConfig" class="mb-6">
        <!-- Etiqueta del campo -->
        <label
          [for]="field.name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >{{ field.name | titlecase }}</label
        >

        <!-- Campo de entrada -->
        <input
          [id]="field.name"
          [type]="field.type"
          [formControlName]="field.name"
          [placeholder]="field.placeholder"
          [ngClass]="{
            'border-gray-300':
              !form.controls[field.name].invalid ||
              form.controls[field.name].pristine,
            'border-red-500':
              form.controls[field.name].invalid &&
              form.controls[field.name].touched,
          }"
          class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

        <!-- Mensaje de error -->
        <div
          *ngIf="
            form.controls[field.name].invalid &&
            form.controls[field.name].touched
          "
          class="text-red-500 text-sm">
          {{ field.errorMessage || (field.name | titlecase) + ' es requerido.' }}
        </div>
      </div>

      <!-- Botón de submit -->
      <button type="submit" [ngClass]="submitButtonClasses">
        {{ submitButtonText }}
      </button>
    </form>
  `,
})
export class FormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() submitButtonText = 'Enviar';
  @Input() submitButtonClasses =
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  @Input() formConfig: {
    name: string;
    type: string;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: any[];
    errorMessage?: string; // Mensaje de error personalizado
  }[] = [];
  @Output() formSubmit = new EventEmitter<object>(); // Emisor de evento para enviar los datos

  form: FormGroup = {} as FormGroup;

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formGroupConfig: any = {};
    this.formConfig.forEach(field => {
      formGroupConfig[field.name] = ['', field.validators || []];
    });
    this.form = this.fb.group(formGroupConfig);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value); // Emitir los datos del formulario al componente padre
    }
  }
}
