import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div
      class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md max-h-[700px] overflow-hidden">
      <div
        class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
        <div>
          <h6
            class="text-xl font-semibold leading-relaxed text-blue-gray-900 mb-1">
            {{ title }}
          </h6>
          <p *ngIf="subtitle" class="text-sm font-normal text-blue-gray-600">
            <svg
              *ngIf="subtitleIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="3"
              stroke="currentColor"
              class="h-4 w-4 text-blue-500 mr-1">
              <path [attr.d]="subtitleIcon"></path>
            </svg>
            {{ subtitle }}
          </p>
        </div>
        <button
          *ngIf="actionIcon"
          class="text-blue-gray-500 hover:bg-blue-gray-500/10 w-8 h-8 rounded-lg"
          type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="h-6 w-6">
            <path [attr.d]="actionIcon"></path>
          </svg>
        </button>
      </div>

      <div class="p-4 flex flex-wrap gap-3 items-end">
        <!-- Búsqueda Configurable -->
        <div class="flex flex-col gap-1 items-start">
          <label for="search">{{ searchPlaceholder }}</label>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="applyFilters()"
            [placeholder]="searchPlaceholder"
            class="border border-gray-300 rounded p-2" />
        </div>

        <!-- Filtros Select -->
        <div *ngFor="let filter of filters">
          <label for="{{ filter.field }}" class="pr-2">{{
            filter.label
          }}</label>
          <select
            [(ngModel)]="filter.selectedValue"
            (change)="applyFilters()"
            class="border border-gray-300 rounded pr-2 w-full">
            <option value="">Mostrar todo</option>
            <option *ngFor="let option of filter.options" [value]="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Contenido de la tabla -->
      <div class="p-6 overflow-x-scroll px-0 pt-0 pb-2">
        <table class="w-full min-w-[640px] table-auto p-6">
          <thead>
            <tr>
              <th
                *ngFor="let col of columns"
                class="border-b border-blue-gray-50 py-3 px-6 text-left">
                <p class="font-medium uppercase text-blue-gray-400">
                  {{ col.header }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of filteredData">
              <td
                *ngFor="let col of columns"
                class="py-3 px-5 border-b border-blue-gray-50">
                <p [class.font-bold]="col.isBold" class="text-sm">
                  {{ row[col.field] }}
                </p>
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
                    version="1.1"
                    id="svg1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg">
                    <defs id="defs1" />
                    <g id="g1">
                      <image
                        width="24"
                        height="24"
                        preserveAspectRatio="none"
                        xlink:href="data:image/png;base64,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&#10;"
                        id="image1" />
                    </g>
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
export class CustomTableComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.filteredData = [...this.data];
      this.applyFilters(); // Asegura que los filtros se apliquen cada vez que cambia `data`
    }
  }

  applyFilters() {
    this.filteredData = this.data.filter(row => {
      const matchesSearchTerm = this.searchTerm
        ? row[this.searchField]
            ?.toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      const matchesFilters = this.filters.every(filter => {
        return (
          !filter.selectedValue || row[filter.field] === filter.selectedValue
        );
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
