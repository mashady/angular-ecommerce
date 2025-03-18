import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { MainSection1Component } from './components/main-section-1/main-section-1.component';
import { MainSection2Component } from './components/main-section-2/main-section-2.component';
import { ProductRequestService } from '../../services/product-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MainSection1Component, MainSection2Component],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  currProduct?: Product;
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract ID from route parameters
    const id = this.route.snapshot.paramMap.get('id');
    
    if (!id) {
      this.error = 'Product ID not found';
      this.loading = false;
      return;
    }
    
    // Fetch product data
    this.productService.getSingleProduct(id)
      .subscribe({
        next: (data) => {
          console.log('Product data in component:', data);
          this.currProduct = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.error = 'Failed to load product data';
          this.loading = false;
        }
      });
  }
}