import { Component,Input } from '@angular/core';
import { RegistrarPacienteComponent } from "../../../patients/components/registrar-paciente/registrar-paciente.component";
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";
import { NgForOf,NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppointmentService } from "../../services/appointment.service";
import { ObraSocial,PlanObraSocial,MetodoPago } from "../../models/appointment.model";
import { send } from 'process';

@Component({
  selector: 'app-appointment-payments-form',
  standalone: true,
  imports: [CustomTableComponent, ReusableModalComponent, RegistrarPacienteComponent, NgIf, NgForOf, ReactiveFormsModule, FormsModule],
  templateUrl: './appointment-payments-form.component.html',
  styleUrls: ['./appointment-payments-form.component.css']
})
export class AppointmentPaymentsFormComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() selectedRow: any;
  
  tableHeaders = [
    { header: 'ID Factura', field: 'idFactura', isBold: false },
    { header: 'Obra Social', field: 'ObraSocial', isBold: false },
    { header: 'Número Transacción', field: 'numeroTransaccion', isBold: false },
    { header: 'Monto Total', field: 'montoTotal', isBold: false },
    { header: 'Fecha Pago', field: 'fechaPago', isBold: false },
  ];
  
  billingForm!: FormGroup;  
  ObrasSociales: ObraSocial[] = [];
  PlanesObraSocial: PlanObraSocial[] = [];
  MetodosPago: MetodoPago[] = [];

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {

    this.getObrasSociales();
    this.getMetodosPago();

    this.billingForm = this.fb.group({
      idTurno: [0, Validators.required],
      obraSocial: [0],
      idPlanObraSocial: [0, Validators.required],
      idMetodoPago: [0, Validators.required],
      numeroTransaccion: ['', Validators.required],
      montoTotal: [0, Validators.required],
      montoPaciente: [0, Validators.required],
      fechaPago: ['', Validators.required]
    });

    this.billingForm.get('obraSocial')?.valueChanges.subscribe((newValue) => {
      this.appointmentService.getPlanesObraSocial(newValue).subscribe(response => {
        this.PlanesObraSocial = response;
      },
        error => {
          console.error('Error al obtener planes de obra social:', error);
          this.PlanesObraSocial = [];
        })
    });

    this.appointmentService.getMetodosPago().subscribe(response => {
      this.MetodosPago = response;
    })

    this.appointmentService.getMetodosPago().subscribe(response => {
      this.MetodosPago = response;
    })
  }

  handleSubmit(): void {
    const sendObj = this.billingForm.value;
    sendObj.idTurno = this.selectedRow.id; //ACA DEBERIA LLEGAR EL ID DEL TURNO
    sendObj.idPlanObraSocial = parseInt(sendObj.idPlanObraSocial.toString());
    sendObj.idMetodoPago = parseInt(sendObj.idMetodoPago.toString());
    delete sendObj.obraSocial;

    this.appointmentService.registrarFactura(sendObj).subscribe(response => {
      console.log('Factura registrada:', response);   
      this.handleResetForm()
    });
  }

  handleResetForm(): void {
    this.billingForm.reset();
  }

  getObrasSociales(): void {    
    this.appointmentService.getObrasSociales().subscribe(response => {
      this.ObrasSociales = response;
    });
  }

  getMetodosPago(): void {    
    this.appointmentService.getMetodosPago().subscribe(response => {
      this.MetodosPago = response;
    })
  }
}