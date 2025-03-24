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

  constructor (
    private productService: ProductRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProductsList(1,60).subscribe({
      next: (response) => {
        this.products = response.data;
      } 
    });
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
}
