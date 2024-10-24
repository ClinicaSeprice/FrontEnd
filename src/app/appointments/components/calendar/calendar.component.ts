import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthViewComponent } from '../month-view/month-view.component';
import { WeekViewComponent } from '../week-view/week-view.component';
import { DayViewComponent } from '../day-view/day-view.component';
import { Appointment } from '../../models/appointment.model';
import { AddAppointmentModalComponent } from "../add-appointment-modal/add-appointment-modal.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrls: ['./calendar.component.scss'],
  imports: [CommonModule, MonthViewComponent, WeekViewComponent, DayViewComponent, AddAppointmentModalComponent],
})
export class CalendarComponent {
  selectedView = signal('month');  // Control de la vista actual
  activeDate = signal(new Date());  // Fecha activa
  appointments = signal<Appointment[]>([]);  // Turnos
  isModalOpen = signal(false);  // Estado del modal
  selectedAppointment: Appointment | null = null;  // Turno seleccionado para agregar/editar

  // Método para abrir el modal
  openAddAppointmentModal() {
    this.isModalOpen.set(true);
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen.set(false);
    this.selectedAppointment = null;  // Resetear el turno seleccionado
  }

  // Método para cambiar de vista a mes
  showMonthView() {
    this.selectedView.set('month');
  }

  // Método para cambiar de vista a semana
  showWeekView() {
    this.selectedView.set('week');
  }

  // Método para cambiar de vista a día
  showDayView(selectedDay: Date) {
    this.activeDate.set(selectedDay);
    this.selectedView.set('day');
  }

  // Método para manejar el día seleccionado
  onDaySelected(day: Date) {
    this.showDayView(day);
  }

  // Método para agregar un turno
  onAddAppointment(newAppointment: Appointment) {
    this.appointments.set([...this.appointments(), newAppointment]);
    this.closeModal();  // Cierra el modal después de guardar
  }

  // Método para manejar el envío del formulario
  onSubmit(appointment: Appointment) {
    // Lógica para guardar el turno
    if (this.selectedAppointment) {
      // Actualizar un turno existente
      this.appointments.set(this.appointments().map(app => app.id === appointment.id ? appointment : app));
    } else {
      // Crear un nuevo turno
      this.appointments.set([...this.appointments(), { ...appointment, id: Math.random().toString(36).substr(2, 9) }]);
    }
    this.closeModal();  // Cierra el modal después de guardar
  }
}
