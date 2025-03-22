import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductRequestService } from '../../../services/product-request.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './allproduct.component.html',
  styleUrl: './allproduct.component.css',
})
export class AllproductComponent implements OnInit {
  @Input() selectedCategories: string[] = []; 
  currentPage = 1;
  pageSize = 5;
  displayedProducts: Product[] = [];
  totalPages = 1;
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  loading: boolean = false;
  error: string | null = null;
  totalProducts: number = 0;

  private router = inject(Router);

 
  sortOptions = [
    { label: 'Sort by price: low to high', value: 'price_asc' },
    { label: 'Sort by price: high to low', value: 'price_desc' },
  ];
  selectedSort: string = 'price_asc';

  constructor(private productService: ProductRequestService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductsList().subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalProducts = response.totalProducts;
        this.filteredProducts = this.products; 
        this.totalPages = Math.ceil(
          this.filteredProducts.length / this.pageSize
        );

        this.sortProducts();
        this.updateProducts();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  ngOnChanges(): void {
    this.filterProducts(); 
  }

  
  filterProducts(): void {
    if (this.selectedCategories.length === 0) {
      this.filteredProducts = this.products; 
    } else {
      this.filteredProducts = this.products.filter(
        (product) => this.selectedCategories.includes(product.category) 
      );
    }
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.currentPage = 1; 
    this.updateProducts();
  }

  
  updateProducts(): void {
    let start = (this.currentPage - 1) * this.pageSize;
    let end = start + this.pageSize;
    this.displayedProducts = this.filteredProducts.slice(start, end);
  }

  
  sortProducts(): void {
    this.filteredProducts.sort((a, b) => {
      return this.selectedSort === 'price_asc'
        ? a.price - b.price
        : b.price - a.price;
    });
    this.updateProducts(); 
  }

  onSortChange(): void {
    this.sortProducts();
  }


  getDiscountedPrice(product: Product): string {
    if (product.discount && product.discount > 0) {
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;
      return discountedPrice.toFixed(2); 
    }
    return product.price.toFixed(2); 
  }

 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProducts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProducts();
    }
  }

  pagenumber(page: number): void {
    this.currentPage = page;
    this.updateProducts();
  }


  redirectToDetails(product: Product): void {
    if (product?._id) {
      this.router.navigate(['/product-details', product._id]);
    } else {
      console.error('Product ID is missing:', product);
    }
  }
}
