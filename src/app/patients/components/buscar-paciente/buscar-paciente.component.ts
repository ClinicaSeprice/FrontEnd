import { Component } from '@angular/core';
import { Paciente } from '../../models/patient.model';
import { PacienteService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-paciente.component.html',
  styleUrl: './buscar-paciente.component.css',
})
export class BuscarPacienteComponent {
  dni: number | undefined;
  paciente: Paciente | undefined;

  constructor(private pacienteService: PacienteService) {}

  buscarPaciente(): void {
    if (this.dni !== undefined) {
      this.pacienteService.buscarPacientePorDni(this.dni).subscribe({
        next: (response) => {
          this.paciente = response[0];
          console.log('Paciente encontrado:', this.paciente);
        },
        error: (error) => {
          console.error('Paciente no encontrado:', error);
          this.paciente = undefined;
        },
      });
    }
  }
}
