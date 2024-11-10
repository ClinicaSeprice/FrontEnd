import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDto } from '../../models/appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  @Input() appointment: AppointmentDto = {
    id: 0,
    idPersona: 0,
    idMedico: 0,
    fechaTurno: '',
    horaInicio: '',
    horaFin: '',
    motivo: '',
    estado: '',
    notas: '',
  };
  @Output() guardar = new EventEmitter<AppointmentDto>(); 

  constructor(private appointmentService: AppointmentService) {}

  saveAppointment(): void {
    if (this.appointment.id) {
      // Editar cita
      this.appointmentService
        .updateAppointment(this.appointment.id, this.appointment)
        .subscribe({
          next: () => {
            this.guardar.emit();
          },
          error: error => {
            console.error('Error al actualizar la cita:', error);
          },
        });
    } else {
      // Crear nueva cita
      this.appointmentService.createAppointment(this.appointment).subscribe({
        next: () => {
          this.guardar.emit();
        },
        error: error => {
          console.error('Error al crear la cita:', error);
        },
      });
    }
  }
}
