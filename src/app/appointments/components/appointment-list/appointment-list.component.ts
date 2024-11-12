import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../../shared/components/form/form.component';
import { Validators } from '@angular/forms';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { NgIf } from '@angular/common';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { TurnoDetalleDTO } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AppointmentPaymentsFormComponent } from "../appointment-payments-form/appointment-payments-form.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    FormComponent,
    CustomTableComponent,
    NgIf,
    ReusableModalComponent,
    AppointmentDetailsComponent,
    AppointmentFormComponent,
    AppointmentPaymentsFormComponent
],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointments: TurnoDetalleDTO[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
    // Llamar a la función para obtener las citas del día actual cuando el componente se inicializa
    this.getTodayAppointments(this.appointments);
  }

  userFormConfig = [
    {
      name: 'dni',
      type: 'text',
      placeholder: '12345678',
      validators: [Validators.required, Validators.pattern(/^\d{8}$/)],
      errorMessage: 'El DNI debe tener 8 dígitos',
    },
    {
      name: 'especialidad',
      type: 'select',
      options: [
        { label: 'Cardiología', value: 'cardiologia' },
        { label: 'Pediatría', value: 'pediatria' },
        { label: 'Ginecología', value: 'ginecologia' },
        { label: 'Traumatología', value: 'traumatologia' },
      ],
      placeholder: 'Seleccione una especialidad',
      validators: [Validators.required],
      errorMessage: 'La especialidad es obligatoria',
    },
    {
      name: 'profesional',
      type: 'select',
      options: [
        { label: 'Dr. Juan Pérez', value: 'juan_perez' },
        { label: 'Dra. María López', value: 'maria_lopez' },
        { label: 'Dr. Carlos García', value: 'carlos_garcia' },
        { label: 'Dra. Ana Torres', value: 'ana_torres' },
      ],
      placeholder: 'Seleccione un profesional',
      validators: [Validators.required],
      errorMessage: 'El profesional es obligatorio',
    },
    {
      name: 'fecha',
      type: 'date',
      placeholder: 'dd/mm/aaaa',
      validators: [Validators.required],
      errorMessage: 'La fecha es obligatoria',
    },
    {
      name: 'hora',
      type: 'time',
      placeholder: 'hh:mm',
      validators: [Validators.required],
      errorMessage: 'La hora es obligatoria',
    },
  ];

  // Array para almacenar las citas del día actual
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appointmentsTodayData: any[] = [];

  tableColumns = [
    { header: 'Paciente', field: 'paciente', isBold: true },
    { header: 'Fecha', field: 'fecha' },
    { header: 'Médico', field: 'medico' },
    { header: 'Especialidad', field: 'especialidad' },
    { header: 'Hora', field: 'hora' },
    { header: 'Estado', field: 'estado' },
  ];

  filters = [
    {
      field: 'medico',
      label: 'Profesional',
      options: ['Dr. Juan Rodríguez', 'Dr. Ana Martínez'],
    },
    {
      field: 'especialidad',
      label: 'Especialidad',
      options: ['Consulta General', 'Sobreturno', 'Pediatría'],
    },
  ];

  // Configuración de búsqueda
  searchField = 'fecha'; // Campo en el que se realizará la búsqueda
  searchPlaceholder = 'Buscar por fecha'; // Placeholder para el campo de búsqueda
  searchFieldToday = 'paciente';
  searchPlaceholderToday = 'Buscar por paciente'; // Placeholder para el campo de búsqueda
  showModal = false;
  showDetailsModal = false;
  selectedRow: object | null = null;

  showPaymentModal = false;


  handleShowPaymentModal(): void {
    this.showPaymentModal = true;
  }

  handleFormSubmit(data: object): void {
    console.log('Formulario enviado con datos:', data);
    // Aquí puedes realizar cualquier acción con los datos recibidos
  }

  // Función personalizada para el ícono de detalles
  handleDetailsClick(row: object): void {
    console.log('Detalles de la fila:', row);
    this.selectedRow = row;
    this.showDetailsModal = true;
    // Aquí puedes agregar cualquier lógica personalizada que necesites
  }

  handlePaymentClick(row: object): void {
    console.log('Detalles de la fila:', row);
    this.selectedRow = row;
    this.handleShowPaymentModal();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTodayAppointments(appointments: any[]): void {
    const today = new Date();
    const todayDateString = today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  
    console.log('Fecha de hoy (todayDateString):', todayDateString);
  
    // Filtrar citas del día actual
    this.appointmentsTodayData = appointments.filter(appointment => {
      // Verificar si appointment.fechaTurno existe y es válida
      if (!appointment.fechaTurno) {
        console.log('fechaTurno no definida en appointment:', appointment);
        return false;
      }
  
      // Convertir appointment.fechaTurno a Date y luego a "dd/mm/yyyy"
      const appointmentDate = new Date(appointment.fechaTurno);
      const appointmentDateString = appointmentDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
      console.log(`Fecha de la cita (appointmentDateString) para el ID ${appointment.idTurno}:`, appointmentDateString);
  
      // Comparar con la fecha de hoy
      const isToday = appointmentDateString === todayDateString;
      console.log(`¿La cita con ID ${appointment.idTurno} es hoy?`, isToday);
  
      return isToday;
    });
  
    // Verificar si appointmentsTodayData tiene los datos correctos
    console.log('Citas del día actual:', this.appointmentsTodayData);
  }
  
  openAddAppointmentModal() {
    this.showModal = !this.showModal;
  }

  // Añade esta nueva propiedad en el componente
  tableData: {
    paciente: string;
    fecha: string;
    medico: string;
    especialidad: string;
    hora: string;
    estado: string;
  }[] = [];

  loadAppointments(): void {
    this.appointmentService.getAppointmentDetails().subscribe({
      next: (appointments: TurnoDetalleDTO[]) => {
        // Almacena los datos completos en `appointments`
        this.appointments = appointments;
        console.log('Citas cargadas:', this.appointments);

        // Mapea los datos para adaptarlos a las columnas de la tabla y los asigna a `tableData`
        this.tableData = appointments.map(appointment => ({
          paciente: `${appointment.nombrePaciente} ${appointment.apellidoPaciente}`,
          fecha: appointment.fechaTurno
            ? new Date(appointment.fechaTurno).toLocaleDateString('es-ES')
            : 'Fecha no disponible', // Valor predeterminado si fechaTurno es undefined
          medico: `${appointment.nombreMedico} ${appointment.apellidoMedico}`,
          especialidad: appointment.especialidadMedico,
          hora:
            appointment.horaInicio && appointment.horaFin
              ? `${appointment.horaInicio} - ${appointment.horaFin}`
              : 'Hora no disponible', // Valor predeterminado si horaInicio o horaFin son undefined
          estado: appointment.estado ?? 'Pendiente',
        }));
        // Filtra las citas del día actual
        this.getTodayAppointments(this.tableData);
      },
      error: error => {
        console.error('Error al cargar citas:', error);
      },
    });
  }

  deleteAppointment(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          this.loadAppointments();
        },
        error: error => {
          console.error('Error al eliminar cita:', error);
        },
      });
    }
  }
}
