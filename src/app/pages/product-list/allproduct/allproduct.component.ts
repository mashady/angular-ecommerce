import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { ProductRequestService } from '../../../services/product-request.service';

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './allproduct.component.html',
  styleUrl: './allproduct.component.css'
})
export class AllproductComponent implements OnInit {
  currentPage = 1;  
  pageSize = 5;
  displayedProducts: Product[] = [];
  totalPages = 1;
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalProducts: number = 0;

  // Sorting options
  sortOptions = [
    { label: 'Sort by price: low to high', value: 'price_asc' },
    { label: 'Sort by price: high to low', value: 'price_desc' }
  ];
  selectedSort: string = 'price_asc'; // Default sort option

  constructor(private productService: ProductRequestService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProductsList().subscribe({
      next: (response) => {
        this.products = response.data; // Extract products from "data"
        this.totalProducts = response.totalProducts; // Store total product count
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        
        this.sortProducts(); // Sort first
        this.updateProducts(); // Then paginate
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
 
  updateProducts(): void {
    let start = (this.currentPage - 1) * this.pageSize;
    let end = start + this.pageSize;
    this.displayedProducts = this.products.slice(start, end);
  }



  sortProducts(): void {
    this.products.sort((a, b) => {
      return this.selectedSort === 'price_asc' ? a.price - b.price : b.price - a.price;
    });
    this.updateProducts(); // Ensure displayed products are sorted
  }

  onSortChange(): void {
    this.sortProducts();
  }

  getDiscountedPrice(product: Product): string {
    return (product.price - (product.price * (product.discount || 0) / 100)).toFixed(2);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
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

  pagenumber(page:any):void
  {
   this.currentPage=page

   this.updateProducts()
  }
}