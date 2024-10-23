import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para [(ngModel)]
import { Appointment } from '../../models/appointment.model';
import { MonthViewComponent } from '../month-view/month-view.component';
import { WeekViewComponent } from '../week-view/week-view.component';
import { DayViewComponent } from '../day-view/day-view.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  styleUrls: ['./calendar.component.scss'],
  imports: [CommonModule, FormsModule, NgSwitch, NgSwitchCase, MonthViewComponent, WeekViewComponent, DayViewComponent],
})
export class CalendarComponent {
  selectedView = 'month';  // Vista seleccionada por defecto
  appointments = signal<Appointment[]>([]);  // Signal para manejar la lista de turnos
  activeDate = signal(new Date());  // Fecha activa que se sincroniza en todas las vistas

  // Método que maneja el evento de agregar un turno desde las vistas
  onAddEvent(event: Appointment) {
    const currentAppointments = this.appointments();
    this.appointments.set([...currentAppointments, event]);
  }

  // Cambiar de mes en la vista mensual (sincroniza el cambio)
  changeMonth(offset: number) {
    const newDate = new Date(this.activeDate());
    newDate.setMonth(newDate.getMonth() + offset);
    this.activeDate.set(newDate);
  }

  // Cambiar de día (sincroniza la fecha activa en la vista diaria)
  selectDay(date: Date) {
    this.activeDate.set(date);
    this.selectedView = 'day';  // Cambia a la vista diaria automáticamente
  }
}
