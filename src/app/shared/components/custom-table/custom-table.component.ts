import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div
      class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden">
      <!-- Header de la tarjeta -->
      <div
        class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
        <div>
          <h6
            class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
            {{ title }}
          </h6>
          <p
            *ngIf="subtitle"
            class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
            <svg
              *ngIf="subtitleIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              aria-hidden="true"
              class="h-4 w-4 text-blue-500">
              <path [attr.d]="subtitleIcon"></path>
            </svg>
            {{ subtitle }}
          </p>
        </div>
        <!-- Botón de acción opcional -->
        <button
          *ngIf="actionIcon"
          aria-expanded="false"
          aria-haspopup="menu"
          class="relative middle none font-sans font-medium text-center uppercase transition-all w-8 h-8 rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
          type="button">
          <span
            class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              aria-hidden="true"
              class="h-6 w-6">
              <path [attr.d]="actionIcon"></path>
            </svg>
          </span>
        </button>
      </div>
      <!-- Contenido de la tabla -->
      <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <table class="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              <th
                *ngFor="let col of columns"
                class="border-b border-blue-gray-50 py-3 px-6 text-left">
                <p
                  class="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                  {{ col.header }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data">
              <td
                *ngFor="let col of columns"
                class="py-3 px-5 border-b border-blue-gray-50">
                <p
                  class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold"
                  *ngIf="col.isBold">
                  {{ row[col.field] }}
                </p>
                <p
                  class="block antialiased font-sans text-xs font-medium text-blue-gray-600"
                  *ngIf="!col.isBold">
                  {{ row[col.field] }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class CustomTableComponent {
  // Entrada para los datos de la tabla
  @Input() data: TableRow[] = [];

  // Entrada para las columnas de la tabla
  @Input() columns: { header: string; field: string; isBold?: boolean }[] = [];

  // Personalización de la tarjeta
  @Input() title = 'Título de la tarjeta';
  @Input() subtitle?: string;
  @Input() subtitleIcon?: string;
  @Input() actionIcon?: string;
}

// Definición de TableRow para permitir varios tipos de datos en cada campo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableRow = Record<string, any>;
