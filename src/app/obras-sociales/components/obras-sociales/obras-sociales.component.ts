import { Component, OnInit } from '@angular/core';
import {
  ObraSocialDTO,
  PlanObraSocialDTO,
} from '../../models/obras-sociales/obras-sociales.model';
import { ObraSocialService } from '../../services/obras-sociales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-obras-sociales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './obras-sociales.component.html',
  styleUrl: './obras-sociales.component.css',
})
export class ObrasSocialesComponent implements OnInit {
  obrasSociales: ObraSocialDTO[] = [];
  planesObraSocial: Record<number, PlanObraSocialDTO[]> = {};

  nuevaObraSocial: Partial<ObraSocialDTO> = {
    nombre: '',
    cuit: 0,
    baja: false,
    fechaAlta: new Date().toISOString(),
    fechaModificacion: new Date().toISOString(),
  };

  nuevoPlanObraSocial: Partial<PlanObraSocialDTO> = {
    idObraSocial: 0,
    nombrePlan: '',
    cobertura: 0,
    baja: false,
    fechaAlta: new Date().toISOString(),
    fechaModificacion: new Date().toISOString(),
  };

  constructor(private obraSocialService: ObraSocialService) {}

  ngOnInit(): void {
    this.cargarObrasSociales();
  }

  cargarObrasSociales(): void {
    this.obraSocialService.obtenerObrasSociales().subscribe({
      next: obrasSociales => {
        this.obrasSociales = obrasSociales;
        obrasSociales.forEach(obra => {
          if (obra.idObraSocial !== undefined) {
            this.cargarPlanesObraSocial(obra.idObraSocial);
          }
        });
      },
      error: error => console.error('Error al cargar las obras sociales:', error),
    });
  }

  cargarPlanesObraSocial(idObraSocial: number): void {
    if (idObraSocial !== undefined && idObraSocial !== null) {
      this.obraSocialService.obtenerPlanesPorObraSocial(idObraSocial).subscribe({
        next: planes => {
          this.planesObraSocial[idObraSocial] = planes;
        },
        error: error =>
          console.error(
            `Error al cargar los planes de obra social con ID ${idObraSocial}:`,
            error
          ),
      });
    } else {
      console.warn(`idObraSocial no válido para cargar planes: ${idObraSocial}`);
    }
  }

  crearObraSocial(): void {
    if (this.nuevaObraSocial.nombre && this.nuevaObraSocial.cuit) {
      this.obraSocialService
        .crearObraSocial(this.nuevaObraSocial as ObraSocialDTO)
        .subscribe({
          next: obraSocial => {
            this.obrasSociales.push(obraSocial);
            this.cargarObrasSociales();
            this.nuevaObraSocial = {
              nombre: '',
              cuit: 0,
              baja: false,
              fechaAlta: new Date().toISOString(),
              fechaModificacion: new Date().toISOString(),
            };
          },
          error: error =>
            console.error('Error al crear la obra social:', error),
        });
    }
  }

  crearPlanObraSocial(): void {
    console.log('idObraSocial seleccionado:', this.nuevoPlanObraSocial.idObraSocial);
  
    // Asegurarse de que idObraSocial tenga un valor antes de enviar la solicitud
    if (this.nuevoPlanObraSocial.idObraSocial && this.nuevoPlanObraSocial.nombrePlan && this.nuevoPlanObraSocial.cobertura !== undefined) {
      const idObraSocial = this.nuevoPlanObraSocial.idObraSocial; // Guardar el idObraSocial seleccionado
      this.obraSocialService.crearPlanObraSocial(this.nuevoPlanObraSocial as PlanObraSocialDTO).subscribe({
        next: (plan) => {
          // Usar idObraSocial en lugar de plan.idObraSocial si está undefined
          const obraId = plan.idObraSocial || idObraSocial;
  
          // Actualizar planes en la lista usando el idObraSocial de la selección
          if (obraId !== undefined) {
            if (!this.planesObraSocial[obraId]) {
              this.planesObraSocial[obraId] = [];
            }
            this.planesObraSocial[obraId].push(plan);
            this.cargarPlanesObraSocial(obraId); // Recargar los planes de esta obra social
          } else {
            console.warn('No se pudo determinar el idObraSocial para actualizar los planes:', plan);
          }
  
          // Resetear el formulario de nuevo plan
          this.nuevoPlanObraSocial = { idObraSocial: 0, nombrePlan: '', cobertura: 0, baja: false, fechaAlta: new Date().toISOString(), fechaModificacion: new Date().toISOString() };
        },
        error: (error) => console.error('Error al crear el plan de obra social:', error)
      });
    }
  }
}
