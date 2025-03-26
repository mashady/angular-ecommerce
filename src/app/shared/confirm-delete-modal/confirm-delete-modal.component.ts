import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.css'
})
export class ConfirmDeleteModalComponent {
  isVisible = false;
  productIdToDelete: string | null = null;

  @Output() deleteConfirmed = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  open(productId: string): void {
    this.productIdToDelete = productId;
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  confirmDelete(): void {
    if (this.productIdToDelete) {
      this.deleteConfirmed.emit(this.productIdToDelete);
    }
    this.close();
  }
}
