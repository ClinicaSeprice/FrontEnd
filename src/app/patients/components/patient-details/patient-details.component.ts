import { Component, Input } from '@angular/core';
import { PatientDto } from '../../models/patient.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule,NgIf],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
closeDetails() {
throw new Error('Method not implemented.');
}
  @Input() patient: PatientDto | null = null;
}
