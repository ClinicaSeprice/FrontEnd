import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-h-[700px] overflow-hidden">
      <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
        <div>
          <h6 class="text-xl font-semibold leading-relaxed text-blue-gray-900 mb-1">
            {{ title }}
          </h6>
          <p *ngIf="subtitle" class="text-sm font-normal text-blue-gray-600">
            <svg *ngIf="subtitleIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="h-4 w-4 text-blue-500 mr-1">
              <path [attr.d]="subtitleIcon"></path>
            </svg>
            {{ subtitle }}
          </p>
        </div>
        <button *ngIf="actionIcon" class="text-blue-gray-500 hover:bg-blue-gray-500/10 w-8 h-8 rounded-lg" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="h-6 w-6">
            <path [attr.d]="actionIcon"></path>
          </svg>
        </button>
        
      </div>

      <div class="p-4 flex flex-wrap gap-3 items-end">
        <!-- Búsqueda Configurable -->
        <div class="flex flex-col gap-1 items-start">
          <label for="search">{{ searchPlaceholder }}</label>
          <input type="text" [(ngModel)]="searchTerm" (input)="applyFilters()" [placeholder]="searchPlaceholder" class="border border-gray-300 rounded p-2" />
        </div>

        <!-- Filtros Select -->
        <div *ngFor="let filter of filters">
          <label for="{{ filter.field }}" class="pr-2">{{ filter.label }}</label>
          <select [(ngModel)]="filter.selectedValue" (change)="applyFilters()" class="border border-gray-300 rounded pr-2 w-full">
            <option value="">Mostrar todo</option>
            <option *ngFor="let option of filter.options" [value]="option">{{ option }}</option>
          </select>
        </div>
      </div>

      <!-- Contenido de la tabla -->
      <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <table class="w-full min-w-[640px] table-auto p-6">
          <thead>
            <tr>
              <th *ngFor="let col of columns" class="border-b border-blue-gray-50 py-3 px-6 text-left">
                <p class="font-medium uppercase text-blue-gray-400">{{ col.header }}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of filteredData">
              <td *ngFor="let col of columns" class="py-3 px-5 border-b border-blue-gray-50">
                <p [class.font-bold]="col.isBold" class="text-sm">{{ row[col.field] }}</p>
              </td>
              <!-- Ícono de más detalles -->
              <td class="py-3 px-5 border-b border-blue-gray-50 text-center">
                <button
                  (click)="handleDetailsClick(row)"
                  class="text-blue-500 hover:text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12H9m4-4H9m6 8H9" />
                  </svg>
                </button>

                <button
                *ngIf="handlePaymentClick"
                (click)="handlePaymentClick.emit(row)"
                  class="text-green-500 hover:text-green-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12H9m4-4H9m6 8H9" />
                  </svg>
                </button>

              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class CustomTableComponent implements OnInit {
  @Input() data: TableRow[] = [];
  @Input() columns: { header: string; field: string; isBold?: boolean }[] = [];
  @Input() title = 'Título de la tarjeta';
  @Input() subtitle?: string;
  @Input() subtitleIcon?: string;
  @Input() actionIcon?: string;
  @Input() filters: FilterConfig[] = [];
  @Input() searchField = 'paciente';
  @Input() searchPlaceholder = 'Buscar...';

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onDetailsClick = new EventEmitter<TableRow>();
  @Output() handlePaymentClick = new EventEmitter<TableRow>();

  filteredData: TableRow[] = [];
  searchTerm = '';

  ngOnInit() {
    this.filteredData = [...this.data];
  }

  applyFilters() {
    this.filteredData = this.data.filter(row => {
      const matchesSearchTerm = this.searchTerm
        ? row[this.searchField]?.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesFilters = this.filters.every(filter => {
        return !filter.selectedValue || row[filter.field] === filter.selectedValue;
      });

      return matchesSearchTerm && matchesFilters;
    });
  }

  handleDetailsClick(row: TableRow): void {
    this.onDetailsClick.emit(row);
  }
}

// Tipos adicionales
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableRow = Record<string, any>;

export interface FilterConfig {
  field: string;
  label: string;
  options: string[];
  selectedValue?: string;
}
