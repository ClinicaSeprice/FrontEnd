import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css',
})
export class AppointmentDetailsComponent implements OnInit {
closeDetails() {
throw new Error('Method not implemented.');
}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() selectedRow: any;

  // Datos adicionales del paciente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patientDetails: any;

  ngOnInit(): void {
    if (this.selectedRow) {
      this.loadPatientDetails(this.selectedRow.id);
    }
  }

  // Método simulado para cargar los detalles del paciente
  loadPatientDetails(patientId: string): void {
    // Aquí podrías llamar a un servicio para obtener detalles completos del paciente
    // Simulación de datos obtenidos:
    this.patientDetails = {
      id: patientId,
      nombre: this.selectedRow.paciente,
      edad: 32,
      telefono: '123-456-7890',
      direccion: '123 Calle Principal, Ciudad',
    };
  }
}
