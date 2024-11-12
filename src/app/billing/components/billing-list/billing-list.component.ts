import { Component } from '@angular/core';
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";
import { NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingService } from "../../services/billing.service";
import { LiquidacionMedico,ResumenLiquidacionMedico, MetodoPago, Medico, FacturaDetallada, FacturaDetalle } from '../../models/billing.model';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [CustomTableComponent, ReusableModalComponent, NgIf, ReactiveFormsModule, FormsModule],
  templateUrl: './billing-list.component.html',
  styleUrl: './billing-list.component.css'
})
export class BillingListComponent {
  
  tableHeaders = [
    { header: 'ID Liquidacion', field: 'idLiquidacion', isBold: false },
    { header: 'Nombre', field: 'nombreCompleto', isBold: false },
    { header: 'Fecha', field: 'fechaLiquidacion', isBold: false },
    { header: 'N° transaccion', field: 'numeroTransaccion', isBold: false },
    { header: 'Total', field: 'montoTotal', isBold: false },
  ];

  tableHeadersLiq = [
    { header: 'ID Factura', field: 'idFactura', isBold: false },
    { header: 'Obra Social', field: 'ObraSocial', isBold: false },
    { header: 'Número Transacción', field: 'numeroTransaccion', isBold: false },
    { header: 'Monto Total', field: 'montoTotal', isBold: false },
    { header: 'Fecha Pago', field: 'fechaPago', isBold: false },
  ];
  
  
  tableData: ResumenLiquidacionMedico[] = [];
  liquidationForm!: FormGroup; 
  Liquidaciones: LiquidacionMedico[] = [];
  currentLiquidation: LiquidacionMedico | null = null;
  MetodosPago: MetodoPago[] = []
  Medicos: Medico[] = []
  showModal = false;

  tableDataLiq: FacturaDetallada[] = [];
  Facturas: FacturaDetalle[] = [];
  currentBilling: FacturaDetalle | null = null;


  constructor(private fb: FormBuilder, private liquidationService: BillingService) {
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.liquidationForm = this.fb.group({
      idMedico: [0, Validators.required],
      porcentaje: [0, Validators.required],
      montoTotal: [0, Validators.required],
      idMetodoPago: [0, Validators.required],
      numeroTransaccion: ['', Validators.required]
    });
    
    this.liquidationService.getMetodosPago().subscribe(response => {
      this.MetodosPago = response;
    })
    
    this.liquidationService.getMedicos().subscribe(response => {
      this.Medicos = response;
    })

    this.updateTable();
    this.updateTableLiq();
  }

  openModal(): void {
    this.showModal = true;
  }
  handleDetailsClick(row: object): void {
    const newRow = row as ResumenLiquidacionMedico;
    this.currentLiquidation = this.Liquidaciones.filter(liquidacion => liquidacion.idLiquidacion === newRow.idLiquidacion)[0];    
  }

  handleResetForm(): void {
    this.liquidationForm.reset();
  }

  handleCloseForm(): void {
    this.handleResetForm();
    this.showModal = false;
  }

  handleSubmit(): void {
    const sendObj = this.liquidationForm.value;
    sendObj.idMedico = parseInt(sendObj.idMedico.toString());
    sendObj.idMetodoPago = parseInt(sendObj.idMetodoPago.toString());
    this.liquidationService.postLiquidation(sendObj).subscribe(response => {
      console.log('Factura registrada:', response);
      this.updateTable();
      this.handleCloseForm();
    });    
  }
  
  updateTable(){ 
    this.liquidationService.getLiquidaciones().subscribe(response => {
      this.Liquidaciones = response;
      this.tableData = this.Liquidaciones.map(liquidation => { 
        const formatLiquidation: ResumenLiquidacionMedico = {
          idLiquidacion: liquidation.idLiquidacion,
          nombreCompleto: `${liquidation.apellidoMedico}, ${liquidation.nombreMedico}`,
          fechaLiquidacion: liquidation.fechaLiquidacion,
          numeroTransaccion: liquidation.numeroTransaccion,
          montoTotal: liquidation.montoTotal
        }        
        return formatLiquidation
      });
    })
  };


  handleDetailsClickLiq(row: object): void {
    const newRow = row as FacturaDetalle;
    this.currentBilling = this.Facturas.filter(factura => factura.idFactura === newRow.idFactura)[0];
  }

  updateTableLiq(): void {
    this.liquidationService.getFacturas().subscribe(response => {
      this.Facturas = response;
      this.tableDataLiq = response.map(factura => {        
        const newFactura: FacturaDetallada = {
          idFactura: factura.idFactura,
          ObraSocial: `${factura.nombreObraSocial} - ${factura.nombrePlanObraSocial}`,
          numeroTransaccion: factura.numeroTransaccion,
          montoTotal: factura.montoTotal,
          fechaPago: new Date(factura['fechaPago']).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        }
        return newFactura;
      });
    }) 
  }
}

