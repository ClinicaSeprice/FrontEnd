import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MedicoDto } from '../../models/medico-dto.model';
import { MedicoService } from '../../services/medico.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medico-admin',
  standalone: true,
  templateUrl: './medicos-admin.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./medicos-admin.component.css'],
})
export class MedicosAdminComponent implements OnInit {
  @Output() MedicoRegistrado = new EventEmitter<number>();
  medicos: MedicoDto[] = [];
  nuevoMedico: MedicoDto = {
    nombre: '',
    apellido: '',
    dni: 0,
    email: '',
    telefono: '',
    especialidad: '',
    legajo: 0,
    fechaAlta: this.formatDateForDatetimeLocal(new Date()),  // Formato compatible con datetime-local
    fechaBaja: '',
    fechaModificacion: this.formatDateForDatetimeLocal(new Date()),  // Formato compatible con datetime-local
    user: '',
    password: '',
    fechaNacimiento: '',
    horariosDisponibles: [],
  };

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(): void {
    this.medicoService.getMedicos().subscribe({
      next: medicos => (this.medicos = medicos),
      error: error => console.error('Error al cargar médicos:', error),
    });
  }

  registrarMedico(): void {
    const medicoData = { ...this.nuevoMedico };

    // Si fechaBaja está vacío, lo eliminamos del objeto
    if (!medicoData.fechaBaja) {
      delete medicoData.fechaBaja;
    }

    this.medicoService.registrarMedico(medicoData).subscribe({
      next: response => {
        if (response.idMedico) {
          this.MedicoRegistrado.emit(response.idMedico);
        }
        // Restablece el formulario después de registrar al médico
        this.nuevoMedico = {
          nombre: '',
          apellido: '',
          dni: 0,
          email: '',
          telefono: '',
          especialidad: '',
          legajo: 0,
          fechaAlta: new Date().toISOString(),
          fechaBaja: '',
          fechaModificacion: new Date().toISOString(),
          user: '',
          password: '',
          fechaNacimiento: '',
          horariosDisponibles: [],
        };
      },
      error: error => console.error('Error al registrar médico:', error),
    });
  }

  // Función para formatear la fecha al formato compatible con "datetime-local"
  formatDateForDatetimeLocal(date: Date): string {
    return date.toISOString().slice(0, 16);
  }
}
