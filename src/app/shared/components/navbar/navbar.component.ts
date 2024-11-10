import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { MedicosAdminComponent } from '../../../professional/components/medicos-admin/medicos-admin.component';
import { HorariosAdminComponent } from '../../../professional/components/horarios-admin/horarios-admin.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    ReusableModalComponent,
    MedicosAdminComponent,
    HorariosAdminComponent,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  isModalOpen = false;
  medicoId: number | null = null;

  openModal(): void {
    this.isModalOpen = true;
    this.medicoId = null; // Resetea el ID para mostrar el formulario de registro de médico
  }

  onMedicoRegistrado(id: number): void {
    this.medicoId = id; // Guarda el ID del médico registrado para el formulario de horarios
  }
}
