import { Component, OnInit } from '@angular/core';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { NgIf } from '@angular/common';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { TurnoDetalleDTO } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CustomTableComponent,
    NgIf,
    ReusableModalComponent,
    AppointmentDetailsComponent,
    AppointmentFormComponent,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  appointments: TurnoDetalleDTO[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
    this.getTodayAppointments(this.appointments);
  }
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

  filtersToday = [
    {
      field: 'medico',
      label: 'Profesional',
      options: [] as string[], // Se llenará dinámicamente
      selected: null, // No se selecciona nada por defecto
    },
    {
      field: 'especialidad',
      label: 'Especialidad',
      options: [] as string[], // Se llenará dinámicamente
      selected: null, // No se selecciona nada por defecto
    },
  ];
  
  filtersAll = [
    {
      field: 'medico',
      label: 'Profesional',
      options: [] as string[], // Se llenará dinámicamente
      selected: null, // No se selecciona nada por defecto
    },
    {
      field: 'especialidad',
      label: 'Especialidad',
      options: [] as string[], // Se llenará dinámicamente
      selected: null, // No se selecciona nada por defecto
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

  // Función personalizada para el ícono de detalles
  handleDetailsClick(row: object): void {
    console.log('Detalles de la fila:', row);
    this.selectedRow = row;
    this.showDetailsModal = true;
    // Aquí puedes agregar cualquier lógica personalizada que necesites
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTodayAppointments(appointments: any[]): void {
    const today = new Date();
    const todayDateString = today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }); // Convierte la fecha de hoy a "DD/MM/YYYY"

    console.log('Fecha de hoy (todayDateString):', todayDateString);

    // Filtrar citas del día actual
    this.appointmentsTodayData = appointments.filter(appointment => {
      if (!appointment.fecha) {
        console.log('fecha no definida en appointment:', appointment);
        return false;
      }

      // Convertir appointment.fecha a Date y luego a "DD/MM/YYYY"
      const appointmentDate = new Date(appointment.fecha);
      const appointmentDateString = appointmentDate.toLocaleDateString(
        'es-ES',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }
      );

      console.log(
        `Fecha de la cita (appointmentDateString) para el paciente ${appointment.paciente}:`,
        appointmentDateString
      );

      // Comparar con la fecha de hoy
      const isToday = appointmentDateString === todayDateString;
      console.log(
        `¿La cita para el paciente ${appointment.paciente} es hoy?`,
        isToday
      );

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

        // Llenar dinámicamente las opciones de los filtros
        this.populateFilterOptions();

        // Filtra las citas del día actual
        this.getTodayAppointments(this.tableData);
      },
      error: error => {
        console.error('Error al cargar citas:', error);
      },
    });
  }

// Función para llenar las opciones de los filtros de ambas tablas dinámicamente
private populateFilterOptions(): void {
  const medicoOptions = new Set<string>();
  const especialidadOptions = new Set<string>();

  // Extraer opciones únicas de médico y especialidad
  this.tableData.forEach(appointment => {
    medicoOptions.add(appointment.medico);
    especialidadOptions.add(appointment.especialidad);
  });

  const medicoOptionsArray = Array.from(medicoOptions);
  const especialidadOptionsArray = Array.from(especialidadOptions);

  // Asignar opciones a los filtros de la primera tabla (Citas del día)
  this.filtersToday.find(filter => filter.field === 'medico')!.options = medicoOptionsArray;
  this.filtersToday.find(filter => filter.field === 'especialidad')!.options = especialidadOptionsArray;

  // Asignar opciones a los filtros de la segunda tabla (Turnos Registrados)
  this.filtersAll.find(filter => filter.field === 'medico')!.options = medicoOptionsArray;
  this.filtersAll.find(filter => filter.field === 'especialidad')!.options = especialidadOptionsArray;
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
