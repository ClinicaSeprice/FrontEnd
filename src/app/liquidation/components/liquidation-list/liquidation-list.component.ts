import { Component } from '@angular/core';
import { RegistrarPacienteComponent } from "../../../patients/components/registrar-paciente/registrar-paciente.component";
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";
import { NgForOf,NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { LiquidationService } from "../../services/liquidation.service";
import { ObraSocial,PlanObraSocial,MetodoPago, FacturaDetallada, FacturaDetalle } from "../../models/liquidation.model";

@Component({
  selector: 'app-liquidation-list',
  standalone: true,
  imports: [CustomTableComponent, ReusableModalComponent, RegistrarPacienteComponent, NgIf, NgForOf, ReactiveFormsModule, FormsModule],
  templateUrl: './liquidation-list.component.html',
  styleUrls: ['./liquidation-list.component.css']
})
export class LiquidationListComponent {
  
  tableHeaders = [
    { header: 'ID Factura', field: 'idFactura', isBold: false },
    { header: 'Obra Social', field: 'ObraSocial', isBold: false },
    { header: 'Número Transacción', field: 'numeroTransaccion', isBold: false },
    { header: 'Monto Total', field: 'montoTotal', isBold: false },
    { header: 'Fecha Pago', field: 'fechaPago', isBold: false },
  ];
  
  tableData: FacturaDetallada[] = [];
  billingForm!: FormGroup;  
  ObrasSociales: ObraSocial[] = [];
  Facturas: FacturaDetalle[] = [];
  PlanesObraSocial: PlanObraSocial[] = [];
  MetodosPago: MetodoPago[] = [];
  currentBilling: FacturaDetalle | null = null;
  showModal = false;


  constructor(private fb: FormBuilder, private liquidationService: LiquidationService) {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {

    this.liquidationService.getObrasSociales().subscribe(response => {
      this.ObrasSociales = response;
    });

    this.billingForm = this.fb.group({
      idTurno: [1, Validators.required],
      obraSocial: [0],
      idPlanObraSocial: [0, Validators.required],
      idMetodoPago: [0, Validators.required],
      numeroTransaccion: ['', Validators.required],
      montoTotal: [0, Validators.required],
      montoPaciente: [0, Validators.required],
      fechaPago: ['', Validators.required]
    });

    this.billingForm.get('obraSocial')?.valueChanges.subscribe((newValue) => {
      this.liquidationService.getPlanesObraSocial(newValue).subscribe(response => {
        this.PlanesObraSocial = response;
      },
        error => {
          console.error('Error al obtener planes de obra social:', error);
          this.PlanesObraSocial = [];
        })
    });

    this.liquidationService.getMetodosPago().subscribe(response => {
      this.MetodosPago = response;
    })

    this.liquidationService.getFacturas().subscribe(response => {
      this.Facturas = response;
      const refactResponse: FacturaDetallada[] = response.map(factura => {        
        const newFactura: FacturaDetallada = {
          idFactura: factura.idFactura,
          ObraSocial: `${factura.nombreObraSocial} - ${factura.nombrePlanObraSocial}`,
          numeroTransaccion: factura.numeroTransaccion,
          montoTotal: factura.montoTotal,
          fechaPago: new Date(factura['fechaPago']).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        }
        return newFactura;
      });
      console.log(refactResponse);
      this.tableData = refactResponse;
    })    
  }

  openModal(): void {
    this.showModal = true;
  }

  handleDetailsClick(row: object): void {
    const newRow = row as FacturaDetalle;
    this.currentBilling = this.Facturas.filter(factura => factura.idFactura === newRow.idFactura)[0];
  }

  handleSubmit(): void {
    const sendObj = this.billingForm.value;
    sendObj.idPlanObraSocial = parseInt(sendObj.idPlanObraSocial.toString());
    sendObj.idMetodoPago = parseInt(sendObj.idMetodoPago.toString());
    delete sendObj.obraSocial;

    this.liquidationService.registrarFactura(sendObj).subscribe(response => {
      console.log('Factura registrada:', response);   
      this.handleResetForm()
    });
  }

  handleResetForm(): void {
    this.billingForm.reset();
  }
  handleCloseForm(): void {
    this.handleResetForm();
    this.showModal = false;
  }

  getData(): void {
    this.liquidationService.getFacturas().subscribe({
      next: (response) => {
        const refactResponse: FacturaDetallada[] = response.map(factura => {        
          const newFactura: FacturaDetallada = {
            idFactura: factura.idFactura,
            ObraSocial: `${factura.nombreObraSocial} - ${factura.nombrePlanObraSocial}`,
            numeroTransaccion: factura.numeroTransaccion,
            montoTotal: factura.montoTotal,
            fechaPago: factura.fechaPago,
          }
          return newFactura;
        });
        console.log(refactResponse);
        this.tableData = [...refactResponse];
      }      
    });    
  }

}

