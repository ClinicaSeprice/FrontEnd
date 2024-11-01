import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="p-6 overflow-x-scroll">
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
  `,
  styles: ``,
})
export class CustomTableComponent {
  // Entrada para los datos de la tabla
  @Input() data: TableRow[] = [];

  // Entrada para las columnas de la tabla
  @Input() columns: { header: string; field: string; isBold?: boolean }[] = [];
}

// Definición de TableRow para permitir varios tipos de datos en cada campo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TableRow = Record<string, any>;
