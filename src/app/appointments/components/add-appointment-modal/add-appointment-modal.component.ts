import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-appointment-modal',
  templateUrl: './add-appointment-modal.component.html',
  standalone: true,
  imports: [NgClass,FormsModule],
})
export class AddAppointmentModalComponent {
  @Input() appointment!: Appointment;
  @Output() save = new EventEmitter<Appointment>();
  isModalOpen = false; // Variable para controlar el estado del modal

  onSubmit() {
    this.save.emit(this.appointment); // Emitir los datos del turno
  }

  closeModal() {
    // Lógica para cerrar modal
  }
}
