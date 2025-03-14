import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {
  totalResults = 159;
  start = 1;
  end = 20;
  itemsPerPage = 20;
  viewMode: 'grid' | 'list' = 'grid';
  
  // Sorting options
  sortOptions = [
    { label: 'Sort by average rating', value: 'rating' },
    { label: 'Sort by price: low to high', value: 'price_asc' },
    { label: 'Sort by price: high to low', value: 'price_desc' }
  ];
  selectedSort = 'rating';
  
  // Items per page options
  itemsPerPageOptions = [10, 20, 50, 100];
  
  onSortChange() {
    console.log('Selected Sort:', this.selectedSort);
  }
  
  onItemsPerPageChange() {
    this.end = Math.min(this.start + this.itemsPerPage - 1, this.totalResults);
    console.log('Items per page changed:', this.itemsPerPage);
  }
  
  toggleView(view: 'grid' | 'list') {
    this.viewMode = view;
    console.log('View mode changed:', this.viewMode);
  }
}
