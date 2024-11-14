import { Component, OnInit } from '@angular/core';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { NgIf } from '@angular/common';
import { CustomTableComponent, TableRow } from '../../../shared/components/custom-table/custom-table.component';
import { PatientService } from '../../services/patient.service';
import { PatientDto } from '../../models/patient.model';
import { BuscarPacienteComponent } from '../buscar-paciente/buscar-paciente.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { AppointmentDto } from '../../../appointments/models/appointment.model';
import { RegistrarPacienteComponent } from "../registrar-paciente/registrar-paciente.component";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    ReusableModalComponent,
    NgIf,
    CustomTableComponent,
    BuscarPacienteComponent,
    PatientDetailsComponent,
    RegistrarPacienteComponent
],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  patients: PatientDto[] = [];
  appointments: AppointmentDto[] = [];
  searchField = 'nombre';
  columns = [
    { header: 'Nombre', field: 'nombre', isBold: true },
    { header: 'Apellido', field: 'apellido' },
    { header: 'DNI', field: 'dni' },
    { header: 'Email', field: 'email' },
    { header: 'Teléfono', field: 'telefono' },
  ];
  showModal = false;
  showDetailsModal = false;
  selectedPatient: PatientDto | null = null;

  constructor(
    private patientService: PatientService,
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatientsWithFullData().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (error) => {
        console.error('Error al obtener los pacientes', error);
      }
    });
  }

  showModalRegistro = false;
  showModalBuscarPorID = false;

  modalRegistroPaciente() {
    this.showModalRegistro = true;
  }

  modalBuscarPaciente() {
    this.showModalBuscarPorID = true;
  }

  handleDetailsClick(patient: TableRow): void {
    this.selectedPatient = patient as PatientDto;
    this.showDetailsModal = true;
  }
}
