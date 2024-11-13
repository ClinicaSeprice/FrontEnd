import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentDto } from '../../models/appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../patients/services/patient.service';
import { MedicoService } from '../../../professional/services/medico.service';
import {
  HorarioDisponibleDto,
  MedicoDto,
} from '../../../professional/models/medico-dto.model';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment: AppointmentDto = {
    idPersona: 0,
    idMedico: 0,
    idHorario: 0,
    motivo: '',
    estado: '',
    notas: '',
    precioTurno: 2000,
  };
  @Output() guardar = new EventEmitter<AppointmentDto>();

  dniPaciente = 0;
  especialidades: string[] = [];
  filteredMedicos: MedicoDto[] = [];
  horariosDisponibles: HorarioDisponibleDto[] = [];
  selectedEspecialidad = '';
  selectedMedicoId: number | null = null;
  selectedHorarioId: number | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private medicoService: MedicoService
  ) {}

  ngOnInit() {
    this.loadEspecialidades();
  }

  loadEspecialidades() {
    this.medicoService.getMedicos().subscribe(medicos => {
      const especialidades = new Set(
        medicos.map(medico => medico.especialidad)
      );
      this.especialidades = Array.from(especialidades);
    });
  }

  // Función para buscar el paciente por DNI y asignar su idPersona
  onDniBlur() {
    this.patientService.getPatientByDni(this.dniPaciente).subscribe(
      patient => {
        console.log('Respuesta del servicio:', patient); // Verifica la respuesta del servicio
        if (patient && patient[0] && patient[0].idPersona) {
          this.appointment.idPersona = patient[0].idPersona; // Asigna el idPersona si existe
        } else {
          console.error('Paciente no encontrado o sin idPersona');
          // Aquí puedes implementar un mensaje en la UI para indicar que no se encontró el paciente
        }
      },
      error => {
        console.error('Error en la solicitud de paciente:', error);
        // También podrías mostrar un mensaje de error en la UI si hay un problema con la solicitud
      }
    );
  }
  
  



  onEspecialidadChange() {
    this.medicoService.getMedicos().subscribe(medicos => {
      this.filteredMedicos = medicos.filter(
        medico => medico.especialidad === this.selectedEspecialidad
      );
    });
  }
  onMedicoChange() {
    if (this.selectedMedicoId !== null) {
      this.medicoService
        .getHorariosByMedico(this.selectedMedicoId)
        .subscribe(horarios => {
          this.horariosDisponibles = horarios;
        });
    }
  }

  // Método para formatear la hora en formato de 24 horas o AM/PM
  private formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    return new Date(0, 0, 0, hour, minute).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  saveAppointment(): void {
    // Verifica que idPersona se haya asignado
    console.log(this.appointment.idPersona);
    if (!this.appointment.idPersona) {
      console.error(
        'No se pudo asignar idPersona. Verifica el DNI del paciente.'
      );
      return;
    }
    const appointmentData: AppointmentDto = {
      idPersona: this.appointment.idPersona,
      idMedico: this.selectedMedicoId ?? 0, // Asigna 0 si selectedMedicoId es null
      idHorario: this.selectedHorarioId ?? 0, // Asigna 0 si selectedHorarioId es null
      motivo: this.appointment.motivo,
      precioTurno: this.appointment.precioTurno || 0,
      estado: this.appointment.estado,
      notas: this.appointment.notas,
    };

    if (appointmentData.idMedico && appointmentData.idHorario) {
      this.appointmentService.createAppointment(appointmentData).subscribe({
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
