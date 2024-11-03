import { Component } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form.component";
import { Validators } from '@angular/forms';
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormComponent, CustomTableComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

  userFormConfig = [
    { name: 'Nombre', type: 'text', placeholder: 'John', validators: [Validators.required], errorMessage: 'El nombre es obligatorio' },
    { name: 'Apellido', type: 'text', placeholder: 'Doe', validators: [Validators.required], errorMessage: 'El apellido es obligatorio' },
    { name: 'correo electrónico', type: 'email', placeholder: 'john.doe@example.com', validators: [Validators.required, Validators.email], errorMessage: 'Ingresa un correo electrónico válido' },
    { name: 'contraseña', type: 'password', placeholder: '•••••••••', validators: [Validators.required, Validators.minLength(6)], errorMessage: 'La contraseña debe tener al menos 6 caracteres' }
  ];

  appointmentData = [
    { paciente: 'María López', servicio: 'Consulta General', estado: 'Completada', monto: '$1,500', fecha: '02/11/2023' },
    { paciente: 'José García', servicio: 'Sobreturno', estado: 'Pendiente', monto: '$500', fecha: '02/11/2023' },
    { paciente: 'Ana Martínez', servicio: 'Pediatría', estado: 'Cancelada', monto: '$0', fecha: '01/11/2023' }
  ];

  tableColumns = [
    { header: 'Paciente', field: 'paciente', isBold: true },
    { header: 'Servicio', field: 'servicio' },
    { header: 'Estado', field: 'estado' },
    { header: 'Monto', field: 'monto' },
    { header: 'Fecha', field: 'fecha' }
  ];

  filters = [
    { field: 'estado', label: 'Estado', options: ['Completada', 'Pendiente', 'Cancelada'] },
    { field: 'servicio', label: 'Servicio', options: ['Consulta General', 'Sobreturno', 'Pediatría'] }
  ];

   // Configuración de búsqueda
   searchField = 'paciente'; // Campo en el que se realizará la búsqueda
   searchPlaceholder = 'Buscar por nombre'; // Placeholder para el campo de búsqueda

  handleFormSubmit(data: object): void {
    console.log('Formulario enviado con datos:', data);
    // Aquí puedes realizar cualquier acción con los datos recibidos
  }
}
