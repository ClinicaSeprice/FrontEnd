import { Component, OnInit } from '@angular/core';
import { RegistrarPacienteComponent } from '../registrar-paciente/registrar-paciente.component';
import { BuscarPacienteComponent } from '../buscar-paciente/buscar-paciente.component';
import { ReusableModalComponent } from '../../../shared/components/reusable-modal/reusable-modal.component';
import { NgIf } from '@angular/common';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { PacienteService } from '../../services/patient.service';
import { Paciente } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    RegistrarPacienteComponent,
    BuscarPacienteComponent,
    ReusableModalComponent,
    NgIf,
    CustomTableComponent,
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  searchPlaceholder: string | undefined;
  searchField: string | undefined;
  filters= [];
  tableColumns: {
    header: string;
    field: string;
    isBold?: boolean;
  }[] | undefined;
  tableData = []
  pacientes: Paciente[] = [];

  constructor(private pacienteService: PacienteService) {}



  ngOnInit() {
    this.pacienteService.buscarPaciente().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
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
