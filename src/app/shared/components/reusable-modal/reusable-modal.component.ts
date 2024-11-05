import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  AfterViewInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reusable-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      (click)="close()"
      (keydown.space)="close()"
      (keydown.enter)="close()">
      <div
        class="bg-white rounded-lg p-6 relative max-h-[calc(100vh-60px)] overflow-hidden w-[calc(100vw-60px)]"
        (click)="$event.stopPropagation()"
        (keydown.space)="close()"
        tabindex="0">
        <!-- Título del modal (opcional) -->
        <ng-container *ngIf="title">
          <h2 id="modal-title" class="text-xl font-bold mb-4">{{ title }}</h2>
        </ng-container>
        <div id="modal-content" class="max-h-[calc(100vh-150px)] overflow-y-scroll">
          <ng-content></ng-content>
        </div>
        <button
          (click)="close()"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar modal">
          &times;
        </button>
      </div>
    </div>
  `,
})
export class ReusableModalComponent implements AfterViewInit {
  @Input() title?: string;
  @Output() closeModal = new EventEmitter<void>();
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    this.elementRef.nativeElement.querySelector('.bg-white')?.focus();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  close() {
    this.closeModal.emit();
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }
}
