import { Component, OnInit } from '@angular/core';
import { MetodoPagoDTO } from '../../models/metodo-pagos';
import { MetodoPagoService } from '../../sevices/metodos-pagos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metodos-pagos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './metodos-pagos.component.html',
  styleUrl: './metodos-pagos.component.css',
})
export class MetodosPagosComponent implements OnInit {
  metodosPago: MetodoPagoDTO[] = [];
  nuevoMetodoPago: Partial<MetodoPagoDTO> = {
    nombre: '',
    habilitado: true,
  };

  constructor(private metodoPagoService: MetodoPagoService) {}

  ngOnInit(): void {
    this.cargarMetodosPago();
  }

  cargarMetodosPago(): void {
    this.metodoPagoService.obtenerMetodosPago().subscribe({
      next: metodos => {
        this.metodosPago = metodos;
      },
      error: error =>
        console.error('Error al cargar los métodos de pago:', error),
    });
  }

  crearMetodoPago(): void {
    if (this.nuevoMetodoPago.nombre) {
      this.metodoPagoService
        .crearMetodoPago(this.nuevoMetodoPago as MetodoPagoDTO)
        .subscribe({
          next: response => {
            console.log(response.idMetodoPago); // Mensaje de éxito en consola
            this.cargarMetodosPago(); // Recargar la lista completa de métodos de pago
            this.nuevoMetodoPago = { nombre: '', habilitado: true }; // Reiniciar el formulario
          },
          error: error =>
            console.error('Error al crear el método de pago:', error),
        });
    }
  }
}
