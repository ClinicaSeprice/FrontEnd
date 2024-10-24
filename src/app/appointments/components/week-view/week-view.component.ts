import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  standalone: true,
  styleUrls: ['./week-view.component.scss'],
  imports: [NgFor, DatePipe]
})
export class WeekViewComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;
  @Output() changeDay = new EventEmitter<Date>();  // Emitir el día seleccionado

  daysInWeek: { date: Date, appointments: Appointment[] }[] = [];

  ngOnChanges() {
    this.generateDaysInWeek();
  }

  // Genera los días de la semana
  generateDaysInWeek() {
    const startOfWeek = this.getStartOfWeek(this.activeDate);
    this.daysInWeek = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayAppointments = this.getAppointmentsForDay(day);
      this.daysInWeek.push({ date: day, appointments: dayAppointments });
    }
  }

  // Obtener el primer día de la semana
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Comienza el lunes
    return new Date(date.setDate(diff));
  }

  // Obtener los turnos para un día específico
  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(app => new Date(app.date).toDateString() === day.toDateString());
  }

  // Emitir el día seleccionado para abrir la vista diaria
  selectDay(day: Date) {
    this.changeDay.emit(day);
  }
}
