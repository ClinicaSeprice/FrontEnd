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
  @Input() idMedico!: number;
  horarios: HorarioDisponibleDto[] = [];
  nuevoHorario: HorarioDisponibleDto = {
    idMedico: 0,
    fecha: '',
    horaInicio: '',
    horaFin: '',
    estado: false
  };

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    if (this.idMedico) {
      this.cargarHorarios();
      this.nuevoHorario.idMedico = this.idMedico;
    }
  }

  cargarHorarios(): void {
    this.medicoService.getHorariosByMedico(this.idMedico).subscribe({
      next: (horarios) => this.horarios = horarios,
      error: (error) => console.error('Error al cargar horarios:', error)
    });
  }

  registrarHorario(): void {
    this.nuevoHorario.idMedico = this.idMedico; // Asegura que el ID del médico esté asignado
    this.medicoService.registrarHorario(this.nuevoHorario).subscribe({
      next: () => {
        this.cargarHorarios();
        this.nuevoHorario.fecha = '';
        this.nuevoHorario.horaInicio = '';
        this.nuevoHorario.horaFin = '';
      },
      error: (error) => console.error('Error al registrar horario:', error)
    });
  }
}
