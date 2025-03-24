import { Component } from '@angular/core';
import { ProductRequestService } from '../../../services/product-request.service';
import { Product } from '../../../interfaces/product';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;


@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products !: Product[];
  page: number = 1;
  totalPages: number = 0;
  pagesArray: number[] = [];
  currentPage: number = 1;
  limit: number = 9;
  constructor (
    private productService: ProductRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProductsList(this.page, this.limit).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
      } 
    });
    this.pagenumber(this.currentPage);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        console.log('Product deleted successfully', response);
        // Close the modal
        const modalElement = document.getElementById('deleteProduct');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
        // Refresh the products list
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error deleting product', err);
      }
    });
  }

  pagenumber(page: number): void {
    console.log(page);
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.productService.getProductsList(page, this.limit).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.totalPages;
        this.pagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
      }
    });
  }
}
