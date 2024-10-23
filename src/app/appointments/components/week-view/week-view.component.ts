import { Component, Input, OnChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  standalone: true,
  styleUrls: ['./week-view.component.scss'],
  imports: [DatePipe, NgFor],
})
export class WeekViewComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;  // Recibe la fecha activa
  daysInWeek: { date: Date }[] = [];

  ngOnChanges() {
    this.generateDaysInWeek();
  }

  // Genera los días de la semana basándose en la activeDate
  generateDaysInWeek() {
    const startOfWeek = this.getStartOfWeek(this.activeDate);
    this.daysInWeek = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.daysInWeek.push({ date: day });
    }
  }

  // Obtiene el primer día de la semana a partir de la fecha activa
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Comenzar la semana en lunes
    return new Date(date.setDate(diff));
  }

  // Filtrar los turnos correspondientes a un día de la semana
  getAppointmentsForDay(day: { date: Date }): Appointment[] {
    return this.appointments.filter(
      (appointment) => new Date(appointment.date).toDateString() === day.date.toDateString()
    );
  }
}

