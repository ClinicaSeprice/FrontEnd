import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { DatePipe, NgClass, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  standalone: true,
  styleUrls: ['./month-view.component.scss'],
  imports: [DatePipe, NgFor, NgClass, TitleCasePipe],
})
export class MonthViewComponent implements OnInit, OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() activeDate!: Date;  // Recibe la fecha activa del componente principal
  @Output() addEvent = new EventEmitter<Appointment>();
  @Output() changeDay = new EventEmitter<Date>();  // Emitir el día seleccionado

  daysInMonth: { date: Date }[] = [];
  currentMonth!: string; // Propiedad para almacenar el nombre del mes
  currentYear!: number; // Propiedad para almacenar el año actual

  ngOnInit() {
    this.generateDaysInMonth();
    this.setCurrentMonth(); // Inicializamos el mes y año actuales
  }

  ngOnChanges() {
    this.generateDaysInMonth();
    this.setCurrentMonth();
  }

  // Genera los días del mes actual basado en la activeDate
  generateDaysInMonth() {
    const year = this.activeDate.getFullYear();
    const month = this.activeDate.getMonth();
    const days = new Date(year, month + 1, 0).getDate(); // Días del mes

    this.daysInMonth = [];
    for (let i = 1; i <= days; i++) {
      this.daysInMonth.push({ date: new Date(year, month, i) });
    }
  }
  // Establece el nombre del mes y el año actuales
  setCurrentMonth() {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    this.currentMonth = this.activeDate.toLocaleDateString('es-ES', options); // Mes en español
    this.currentYear = this.activeDate.getFullYear(); // Año actual
  }

  // Navegar al mes siguiente
  nextMonth() {
    this.activeDate.setMonth(this.activeDate.getMonth() + 1);
    this.updateCalendar();
  }

  // Navegar al mes anterior
  prevMonth() {
    this.activeDate.setMonth(this.activeDate.getMonth() - 1);
    this.updateCalendar();
  }

  // Actualiza el calendario cuando se cambia el mes
  updateCalendar() {
    this.generateDaysInMonth();
    this.setCurrentMonth();
  }

  // Obtener los turnos para un día específico
  getAppointmentsForDay(day: { date: Date }): Appointment[] {
    return this.appointments.filter(
      appointment =>
        new Date(appointment.date).toDateString() === day.date.toDateString()
    );
  }

  // Emite el evento para agregar un turno
  addAppointment(day: { date: Date }) {
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nuevo Turno',
      date: day.date.toISOString(),
    };
    this.addEvent.emit(newAppointment);
  }

  // Emitir el evento para seleccionar un día y cambiar a la vista diaria
  selectDay(day: Date) {
    this.changeDay.emit(day);
  }
}
