import { Component } from '@angular/core';
import { Paciente } from '../../models/patient.model';
import { PacienteService } from '../../services/patient.service';
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReusableModalComponent, CommonModule, FormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css',
})
export class RegistrarPacienteComponent {
  paciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: null,
    email: '',
    telefono: '',
    fechaNacimiento: '',
    fechaRegistro: '',
    baja: false,
  };

  constructor(private pacienteService: PacienteService) {}

  registrarPaciente(): void {
    this.pacienteService.altaPaciente(this.paciente).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error al crear el paciente:', error);
      },
      complete: () => {
        console.log('La solicitud ha sido completada');
      },
    });
  }
}
