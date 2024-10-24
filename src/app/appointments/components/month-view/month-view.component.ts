import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  standalone: true,
  styleUrls: ['./month-view.component.scss'],
  imports: [NgFor, DatePipe]
})
export class MonthViewComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;  // Fecha activa
  @Output() changeDay = new EventEmitter<Date>();  // Para notificar cuando se selecciona un día

  daysInMonth: { date: Date, appointments: Appointment[] }[] = [];

  ngOnChanges() {
    this.generateDaysInMonth();
  }

  // Genera los días del mes actual
  generateDaysInMonth() {
    const year = this.activeDate.getFullYear();
    const month = this.activeDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate(); // Obtener cantidad de días del mes

    this.daysInMonth = [];
    for (let i = 1; i <= days; i++) {
      const day = new Date(year, month, i);
      const dayAppointments = this.getAppointmentsForDay(day);
      this.daysInMonth.push({ date: day, appointments: dayAppointments });
    }
  }

  // Obtener los turnos para un día específico
  getAppointmentsForDay(day: Date): Appointment[] {
    return this.appointments.filter(app => new Date(app.date).toDateString() === day.toDateString());
  }

  // Emite el día seleccionado para cambiar a la vista diaria
  selectDay(day: Date) {
    this.changeDay.emit(day);
  }
}
