import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientDto } from '../../models/patient.model';

@Component({
  selector: 'app-buscar-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css'],
})
export class BuscarPacienteComponent {
  dni: number | undefined;
  paciente: PatientDto | null = null;

  constructor(private pacienteService: PatientService) {}

  buscarPaciente(): void {
    if (this.dni !== undefined) {
      this.pacienteService.getPatientByDni(this.dni).subscribe({
        next: (response) => {
          this.paciente = response.length > 0 ? response[0] : null;
          console.log('Paciente encontrado:', this.paciente);
        },
        error: (error) => {
          console.error('Paciente no encontrado:', error);
          this.paciente = null;
        },
      });
    }
  }
}
