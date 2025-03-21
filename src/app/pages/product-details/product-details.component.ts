import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { MainSection1Component } from './components/main-section-1/main-section-1.component';
import { MainSection2Component } from './components/main-section-2/main-section-2.component';
import { ProductRequestService } from '../../services/product-request.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../interfaces/category';
import { CategoryRequestService } from '../../services/category-request.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MainSection1Component, MainSection2Component],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  currProduct?: Product;
  productCategory?: Category;
  loading = true;
  error: string | null = null;

  constructor(
    private productService: ProductRequestService,
    private route: ActivatedRoute,
    private categoryService: CategoryRequestService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'Product ID not found';
      this.loading = false;
      return;
    }

    this.productService.getSingleProduct(id).subscribe({
      next: (data) => {
        this.currProduct = data;
        // Check if currProduct exists and has a category before accessing it
        if (this.currProduct && this.currProduct.category) {
          this.categoryService
            .getCategoryById(this.currProduct.category)
            .subscribe({
              next: (data) => {
                // Make sure currProduct still exists when this callback executes
                if (this.currProduct) {
                  this.currProduct.category = data.name;
                }
              },
              error: (err) => {
                this.error = 'Failed to load category data';
              },
            });
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product data';
        this.loading = false;
      },
    });
  }
}
