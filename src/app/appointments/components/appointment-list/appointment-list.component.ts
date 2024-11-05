import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../shared/components/form/form.component';
import { Validators } from '@angular/forms';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { NgIf } from '@angular/common';
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormComponent, CustomTableComponent, NgIf, ReusableModalComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {

  ngOnInit() {
    // Llamar a la función para obtener las citas del día actual cuando el componente se inicializa
    this.getTodayAppointments(this.appointmentData);
  }

  userFormConfig = [
    {
      name: 'Nombre',
      type: 'text',
      placeholder: 'John',
      validators: [Validators.required],
      errorMessage: 'El nombre es obligatorio',
    },
    {
      name: 'Apellido',
      type: 'text',
      placeholder: 'Doe',
      validators: [Validators.required],
      errorMessage: 'El apellido es obligatorio',
    },
    {
      name: 'correo electrónico',
      type: 'email',
      placeholder: 'john.doe@example.com',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Ingresa un correo electrónico válido',
    },
    {
      name: 'contraseña',
      type: 'password',
      placeholder: '•••••••••',
      validators: [Validators.required, Validators.minLength(6)],
      errorMessage: 'La contraseña debe tener al menos 6 caracteres',
    },
  ];

  appointmentData = [
    {
      paciente: 'María López',
      servicio: 'Consulta General',
      estado: 'Completada',
      profesional: 'Dr. Juan Rodríguez',
      especialidad: 'Medicina General',
      fecha: '04/11/2024',
    },
    {
      paciente: 'José García',
      servicio: 'Sobreturno',
      estado: 'Pendiente',
      profesional: 'Dr. Ana Martínez',
      especialidad: 'Medicina General',
      fecha: '03/11/2024',
    },
    {
      paciente: 'Ana Martínez',
      servicio: 'Pediatría',
      estado: 'Cancelada',
      profesional: 'Dr. Juan Rodríguez',
      especialidad: 'Medicina General',
      fecha: '05/11/2024',
    },
    {
      paciente: 'Luis Fernández',
      servicio: 'Odontología',
      estado: 'Completada',
      profesional: 'Dr. Laura Gómez',
      especialidad: 'Odontología',
      fecha: '03/11/2024',
    },
    {
      paciente: 'Carlos Morales',
      servicio: 'Consulta General',
      estado: 'Pendiente',
      profesional: 'Dr. Pedro Núñez',
      especialidad: 'Medicina General',
      fecha: '04/11/2024',
    },
    {
      paciente: 'Sofía Ríos',
      servicio: 'Dermatología',
      estado: 'Completada',
      profesional: 'Dra. Alicia Vega',
      especialidad: 'Dermatología',
      fecha: '02/11/2024',
    },
    {
      paciente: 'Isabel Torres',
      servicio: 'Oftalmología',
      estado: 'Pendiente',
      profesional: 'Dr. Juan Pérez',
      especialidad: 'Oftalmología',
      fecha: '02/11/2024',
    },
    {
      paciente: 'Ricardo González',
      servicio: 'Consulta General',
      estado: 'Completada',
      profesional: 'Dr. Juan Rodríguez',
      especialidad: 'Medicina General',
      fecha: '01/11/2024',
    },
    {
      paciente: 'Camila Santos',
      servicio: 'Pediatría',
      estado: 'Cancelada',
      profesional: 'Dra. Laura Gómez',
      especialidad: 'Pediatría',
      fecha: '01/11/2024',
    },
    {
      paciente: 'Mateo Rivas',
      servicio: 'Consulta General',
      estado: 'Pendiente',
      profesional: 'Dr. Ana Martínez',
      especialidad: 'Medicina General',
      fecha: '31/10/2024',
    },
    {
      paciente: 'Valentina Gutiérrez',
      servicio: 'Traumatología',
      estado: 'Completada',
      profesional: 'Dr. Pedro Núñez',
      especialidad: 'Traumatología',
      fecha: '31/10/2024',
    },
    {
      paciente: 'Nicolás Herrera',
      servicio: 'Consulta General',
      estado: 'Pendiente',
      profesional: 'Dr. Juan Rodríguez',
      especialidad: 'Medicina General',
      fecha: '31/10/2024',
    },
    {
      paciente: 'Gabriela Silva',
      servicio: 'Odontología',
      estado: 'Completada',
      profesional: 'Dr. Laura Gómez',
      especialidad: 'Odontología',
      fecha: '30/10/2024',
    },
    {
      paciente: 'Andrés Cruz',
      servicio: 'Pediatría',
      estado: 'Cancelada',
      profesional: 'Dr. Ana Martínez',
      especialidad: 'Pediatría',
      fecha: '30/10/2024',
    },
    {
      paciente: 'Fernanda Soto',
      servicio: 'Consulta General',
      estado: 'Pendiente',
      profesional: 'Dr. Juan Pérez',
      especialidad: 'Medicina General',
      fecha: '30/10/2024',
    },
    {
      paciente: 'Diego Ramos',
      servicio: 'Cardiología',
      estado: 'Completada',
      profesional: 'Dr. Pedro Núñez',
      especialidad: 'Cardiología',
      fecha: '29/10/2024',
    },
    {
      paciente: 'Lorena Peña',
      servicio: 'Consulta General',
      estado: 'Pendiente',
      profesional: 'Dra. Laura Gómez',
      especialidad: 'Medicina General',
      fecha: '29/10/2024',
    },
    {
      paciente: 'Francisco Muñoz',
      servicio: 'Dermatología',
      estado: 'Completada',
      profesional: 'Dr. Alicia Vega',
      especialidad: 'Dermatología',
      fecha: '29/10/2024',
    },
    {
      paciente: 'Lucía Castro',
      servicio: 'Consulta General',
      estado: 'Cancelada',
      profesional: 'Dr. Juan Rodríguez',
      especialidad: 'Medicina General',
      fecha: '28/10/2024',
    },
    {
      paciente: 'Emilia López',
      servicio: 'Oftalmología',
      estado: 'Completada',
      profesional: 'Dr. Pedro Núñez',
      especialidad: 'Oftalmología',
      fecha: '28/10/2024',
    },
  ];
  

  // Array para almacenar las citas del día actual
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appointmentsTodayData: any[] = [];

  tableColumns = [
    { header: 'Paciente', field: 'paciente', isBold: true },
    { header: 'Servicio', field: 'servicio' },
    { header: 'Especialidad', field: 'especialidad' },
    { header: 'profesional', field: 'profesional' },
    { header: 'Fecha', field: 'fecha' },
  ];

  filters = [
    {
      field: 'profesional',
      label: 'Profesional',
      options: ['Dr. Juan Rodríguez', 'Dr. Ana Martínez'],
    },
    {
      field: 'servicio',
      label: 'Servicio',
      options: ['Consulta General', 'Sobreturno', 'Pediatría'],
    },
  ];

  // Configuración de búsqueda
  searchField = 'fecha'; // Campo en el que se realizará la búsqueda
  searchPlaceholder = 'Buscar por fecha'; // Placeholder para el campo de búsqueda
  searchFieldToday = 'paciente';
  searchPlaceholderToday = 'Buscar por paciente'; // Placeholder para el campo de búsqueda
  showModal = false;

  handleFormSubmit(data: object): void {
    console.log('Formulario enviado con datos:', data);
    // Aquí puedes realizar cualquier acción con los datos recibidos
  }

  // Función personalizada para el ícono de detalles
  handleDetailsClick(row: object): void {
    console.log('Detalles de la fila:', row);
    // Aquí puedes agregar cualquier lógica personalizada que necesites
  }

  // Función para obtener y asignar las citas del día actual
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTodayAppointments(appointments: any[]): void {
    const today = new Date();
    // Formato "dd/mm/yyyy" para comparar con appointmentData
    const todayDateString = today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Filtrar citas del día actual
    this.appointmentsTodayData = appointments.filter(appointment => {
      return appointment.fecha === todayDateString;
    });

    // Verificar si appointmentsTodayData tiene los datos correctos
    console.log('Citas del día actual:', this.appointmentsTodayData);
  }

  openAddAppointmentModal() {
    this.showModal = !this.showModal;
    throw new Error('Method not implemented.');
    }
}
