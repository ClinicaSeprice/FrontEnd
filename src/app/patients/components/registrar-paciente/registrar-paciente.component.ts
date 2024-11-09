import { Component, inject } from '@angular/core';
import { PatientDto } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReusableModalComponent, CommonModule, FormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css',
})
export class RegistrarPacienteComponent {
  private patientService = inject(PatientService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  patientData: PatientDto = {
    nombre: '',
    apellido: '',
    dni: 0,
    email: '',
    telefono: '',
    fechaNacimiento: '10/02/2000', // Iniciado como string
    fechaRegistro: new Date().toISOString().split('T')[0], // Iniciado como string
    baja: true,
  };

  registerPatient(): void {
    // Convertir fechaNacimiento a "YYYY-MM-DD"
    if (this.patientData.fechaNacimiento) {
      this.patientData.fechaNacimiento = new Date(
        this.patientData.fechaNacimiento
      )
        .toISOString()
        .split('T')[0];
    }
    // Ver el objeto en la consola antes de enviarlo a la API
    console.log('Objeto enviado al registro de paciente:', this.patientData);

    this.patientService.createPatient(this.patientData).subscribe({
      next: response => {
        console.log('Paciente registrado con éxito', response);
        this.toastr.success('Paciente registrado con éxito', 'Éxito');
        this.router.navigate(['/appoitments']);
        // Lógica adicional, como limpiar el formulario o navegar a otra página
      },
      error: (error) => {
        console.error('Error al registrar el paciente', error);
  
        if (error.error?.errors) {
          // Extraer y concatenar mensajes de errores de validación específicos
          const validationErrors = Object.entries(error.error.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join(' | ');
            
          this.toastr.error(validationErrors, 'Errores de validación');
        } else {
          // Captura otros errores generales, como el de DNI ya existente
          const errorMessage = error.error?.title || error.error?.message || 'Hubo un error al registrar el paciente';
          this.toastr.error(errorMessage, 'Error');
        }
      },
      complete: () => {
        console.log('Registro de paciente completado');
      },
    });
  }
}
