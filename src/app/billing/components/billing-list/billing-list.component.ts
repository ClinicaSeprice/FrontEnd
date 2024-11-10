import { Component } from '@angular/core';
import { RegistrarPacienteComponent } from "../../../patients/components/registrar-paciente/registrar-paciente.component";
import { ReusableModalComponent } from "../../../shared/components/reusable-modal/reusable-modal.component";
import { CustomTableComponent } from "../../../shared/components/custom-table/custom-table.component";
import { NgForOf,NgIf } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BillingService } from "../../services/billing.service";
import { LiquidacionMedico,ResumenLiquidacionMedico, MetodoPago, Medico } from '../../models/billing.model';

@Component({
  selector: 'app-billing-list',
  standalone: true,
  imports: [CustomTableComponent, ReusableModalComponent, RegistrarPacienteComponent, NgIf, NgForOf, ReactiveFormsModule, FormsModule],
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
  
  tableData: ResumenLiquidacionMedico[] = [];
  liquidationForm!: FormGroup; 
  Liquidaciones: LiquidacionMedico[] = [];
  currentLiquidation: LiquidacionMedico | null = null;
  MetodosPago: MetodoPago[] = []
  Medicos: Medico[] = []
  showModal = false;


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
}

