import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { RegistrarPacienteComponent } from "../../../patients/components/registrar-paciente/registrar-paciente.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CustomTableComponent, ReusableModalComponent, RegistrarPacienteComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tableData = [
    { paciente: 'María López', servicio: 'Consulta General', estado: 'Completada', monto: '$1,500', fecha: '02/11/2023' },
    { paciente: 'José García', servicio: 'Sobreturno', estado: 'Pendiente', monto: '$500', fecha: '02/11/2023' },
    { paciente: 'Ana Martínez', servicio: 'Pediatría', estado: 'Cancelada', monto: '$0', fecha: '01/11/2023' }
  ];

  tableColumns = [
    { header: 'Paciente', field: 'paciente', isBold: true },
    { header: 'Servicio', field: 'servicio' },
    { header: 'Estado', field: 'estado' },
    { header: 'Monto', field: 'monto' },
    { header: 'Fecha', field: 'fecha' }
  ];

  showModal = false;

  openModal() {
    this.showModal = true;
    console.log('Modal abierto');
  }
}
