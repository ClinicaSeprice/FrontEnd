import { Component, Input, OnInit } from '@angular/core';
import { HorarioDisponibleDto } from '../../models/medico-dto.model';
import { MedicoService } from '../../services/medico.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horarios-admin',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './horarios-admin.component.html',
  styleUrl: './horarios-admin.component.css',
})
export class HorariosAdminComponent implements OnInit {
  @Input() idMedico!: number; // Recibe el ID del médico como un input
  horarios: HorarioDisponibleDto[] = []; // Lista de horarios del médico
  nuevoHorario: HorarioDisponibleDto = {
    idMedico: 0,
    fecha: '',
    horaInicio: '',
    horaFin: '',
    estado: true
  };

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    // Solo carga horarios si idMedico está definido
    if (this.idMedico) {
      this.cargarHorarios();
      this.nuevoHorario.idMedico = this.idMedico; // Asigna el ID del médico al nuevo horario
    }
  }

  cargarHorarios(): void {
    this.medicoService.getHorariosByMedico(this.idMedico).subscribe({
      next: (horarios) => {
        this.horarios = horarios; // Actualiza la lista de horarios
      },
      error: (error) => console.error('Error al cargar horarios:', error)
    });
  }

  registrarHorario(): void {
    // Verifica que el ID del médico esté asignado en el horario
    this.nuevoHorario.idMedico = this.idMedico;

    // Registra el nuevo horario en el backend
    this.medicoService.registrarHorario(this.nuevoHorario).subscribe({
      next: () => {
        this.cargarHorarios(); // Refresca la lista de horarios tras agregar uno nuevo
        // Limpia el formulario de nuevo horario
        this.nuevoHorario.fecha = '';
        this.nuevoHorario.horaInicio = '';
        this.nuevoHorario.horaFin = '';
      },
      error: (error) => console.error('Error al registrar horario:', error)
    });
  }
}
