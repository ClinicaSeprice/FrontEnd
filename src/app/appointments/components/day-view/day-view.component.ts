import { Component, Input, Output, EventEmitter, OnChanges, signal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  standalone: true,
  styleUrls: ['./day-view.component.scss'],
  imports: [NgFor,NgClass,FormsModule,NgStyle]
})
export class DayViewComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;
  @Output() addEvent = new EventEmitter<Appointment>();  // Emitir nuevo turno

  hoursInDay: { label: string, date: Date }[] = [];
  isModalOpen = signal(false);  // Estado del modal
  selectedAppointment: Appointment | null = null;  // Para editar un turno existente
  newAppointment: Appointment = { id: '', title: '', date: '', description: '', location: '', time: '' };

  ngOnChanges() {
    this.generateHoursInDay();
  }

  // Genera las horas del día (de 8:00 a 20:00)
  generateHoursInDay() {
    const startHour = 8;
    const endHour = 20;
    this.hoursInDay = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      const time = new Date(this.activeDate);
      time.setHours(hour, 0, 0, 0);
      this.hoursInDay.push({ label: `${hour}:00`, date: time });
    }
  }

  // Filtrar turnos por hora
  getAppointmentsForHour(hour: Date): Appointment[] {
    return this.appointments.filter(app => new Date(app.date).getHours() === hour.getHours());
  }

// Abrir modal para agregar turno en una hora específica
openAddAppointmentModal(hour: Date) {
  this.selectedAppointment = null;  // Es un nuevo turno
  this.newAppointment = { id: '', title: '', date: hour.toISOString(), description: '', location: '', time: hour.toISOString().substring(11, 16) };
  this.isModalOpen.set(true);  // Abrir el modal
  document.body.classList.add('modal-open');  // Añadir la clase 'modal-open' al body
}

// Abrir modal para ver o editar un turno existente
openAppointmentDetails(appointment: Appointment) {
  this.selectedAppointment = appointment;  // Se está editando este turno
  this.newAppointment = { ...appointment };  // Clonar el turno
  this.isModalOpen.set(true);  // Abrir modal
  document.body.classList.add('modal-open');  // Añadir la clase 'modal-open' al body
}

// Cerrar modal
closeModal() {
  this.isModalOpen.set(false);  // Cerrar modal
  document.body.classList.remove('modal-open');  // Remover la clase 'modal-open' del body
}

  // Enviar nuevo turno o editar uno existente
  onSubmit() {
    if (this.selectedAppointment) {
      this.addEvent.emit({ ...this.newAppointment, id: this.selectedAppointment.id });  // Editar turno existente
    } else {
      this.newAppointment.id = Math.random().toString(36).substring(2, 9);  // Generar un ID único para el nuevo turno
      this.addEvent.emit(this.newAppointment);  // Emitir nuevo turno
    }
    this.closeModal();  // Cerrar modal después de guardar
  }
}
