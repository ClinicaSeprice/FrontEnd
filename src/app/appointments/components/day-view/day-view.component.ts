import { Component, Input, OnChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  standalone: true,
  styleUrls: ['./day-view.component.scss'],
  imports: [DatePipe,NgFor]
})
export class DayViewComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;  // Recibe la fecha activa

  hoursInDay: { label: string, date: Date }[] = [];

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

  // Filtrar los turnos correspondientes a una hora específica
  getAppointmentsForHour(hour: { date: Date }): Appointment[] {
    return this.appointments.filter(
      (appointment) => new Date(appointment.date).getHours() === hour.date.getHours()
    );
  }
}
