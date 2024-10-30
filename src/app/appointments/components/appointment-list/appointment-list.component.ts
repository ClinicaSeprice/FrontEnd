import { Component } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  handleFormSubmit(formData: object): void {
    console.log('Datos del formulario:', formData);
  }
}
