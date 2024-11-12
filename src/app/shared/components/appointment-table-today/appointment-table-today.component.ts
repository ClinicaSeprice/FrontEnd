import { Component, OnInit } from '@angular/core';
import { TurnoDetalleDTO } from '../../../appointments/models/appointment.model';
import { AppointmentService } from '../../../appointments/services/appointment.service';
import { CustomTableComponent, TableRow } from '../custom-table/custom-table.component';

@Component({
  selector: 'app-appointment-table-today',
  standalone: true,
  imports: [CustomTableComponent],
  template: `
    <app-custom-table
      class="w-full"
      [title]="'Citas del día'"
      [subtitle]="'Actualizado Hoy'"
      [data]="appointmentsTodayData"
      [columns]="tableColumns"
      [filters]="filtersToday"
      [searchField]="searchFieldToday"
      [searchPlaceholder]="searchPlaceholderToday"
      (onDetailsClick)="handleDetailsClick($event)"
      (handlePaymentClick)="handlePaymentClick($event)">
    </app-custom-table>
  `,
  styles: ``,
})
export class AppointmentTableTodayComponent implements OnInit {
  appointments: TurnoDetalleDTO[] = [];
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
      options: [] as string[],
      selected: null,
    },
    {
      field: 'especialidad',
      label: 'Especialidad',
      options: [] as string[],
      selected: null,
    },
  ];
  searchFieldToday = 'paciente';
  searchPlaceholderToday = 'Buscar por paciente';
  selectedRow: object | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    this.appointmentService.getAppointmentDetails().subscribe({
      next: (appointments: TurnoDetalleDTO[]) => {
        this.appointments = appointments;
        this.mapAppointmentsData();
        this.filterTodayAppointments();
      },
      error: error => {
        console.error('Error al cargar citas:', error);
      },
    });
  }

  private mapAppointmentsData() {
    this.appointmentsTodayData = this.appointments.map(appointment => ({
      paciente: `${appointment.nombrePaciente} ${appointment.apellidoPaciente}`,
      fecha: appointment.fechaTurno
        ? new Date(appointment.fechaTurno).toLocaleDateString('es-ES')
        : 'Fecha no disponible',
      medico: `${appointment.nombreMedico} ${appointment.apellidoMedico}`,
      especialidad: appointment.especialidadMedico,
      hora:
        appointment.horaInicio && appointment.horaFin
          ? `${appointment.horaInicio} - ${appointment.horaFin}`
          : 'Hora no disponible',
      estado: appointment.estado ?? 'Pendiente',
    }));
    this.populateFilterOptions();
  }

  private filterTodayAppointments(): void {
    const todayDateString = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    this.appointmentsTodayData = this.appointmentsTodayData.filter(
      appointment => appointment.fecha === todayDateString
    );
  }

  private populateFilterOptions(): void {
    const medicoOptions = new Set<string>();
    const especialidadOptions = new Set<string>();

    this.appointmentsTodayData.forEach(appointment => {
      medicoOptions.add(appointment.medico);
      especialidadOptions.add(appointment.especialidad);
    });

    this.filtersToday.find(filter => filter.field === 'medico')!.options =
      Array.from(medicoOptions);
    this.filtersToday.find(filter => filter.field === 'especialidad')!.options =
      Array.from(especialidadOptions);
  }

  handleDetailsClick(row: object): void {
    console.log('Detalles de la fila:', row);
    this.selectedRow = row;
  }

  handlePaymentClick(row: TableRow): void {
    const turno = this.appointments.find(
      appointment =>
        `${appointment.nombrePaciente} ${appointment.apellidoPaciente}` ===
          row['paciente'] &&
        new Date(appointment.fechaTurno).toLocaleDateString('es-ES') ===
          row['fecha']
    );

    if (turno) {
      console.log('Turno encontrado para facturación:', turno);
      this.selectedRow = turno;
    } else {
      console.error('No se encontró el turno para la fila seleccionada:', row);
    }
  }
}
