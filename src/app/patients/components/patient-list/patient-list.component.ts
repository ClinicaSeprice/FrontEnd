import { Component, OnInit } from '@angular/core';
import { RegistrarPacienteComponent } from '../registrar-paciente/registrar-paciente.component';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { NgFor, NgIf } from '@angular/common';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { PatientService } from '../../services/patient.service';
import { PatientDto } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    RegistrarPacienteComponent,
    ReusableModalComponent,
    NgIf,
    CustomTableComponent,
    NgFor
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent  implements OnInit {
  patients: PatientDto[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // Cargar lista de pacientes
  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      data => {
        this.patients = data;
      },
      error => {
        console.error('Error al obtener los pacientes', error);
      }
    );
  }
  showModal = false;
  showModalDos = false;
  modalRegistroPaciente() {
    this.showModal = true;
  }

  modalBuscarPaciente() {
    this.showModalDos = true;
  }

  
  handleDetailsClick() {
    throw new Error('Method not implemented.');
  }

}
