import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs/operators';
import { ProductRequestService } from '../../../services/product-request.service';
@Component({
  selector: 'app-store-products',
  imports: [RouterLink, CurrencyPipe, AsyncPipe, NgFor, NgIf],
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css'],
})
export class StoreProductsComponent implements OnInit {
  products$!: Observable<any[]>;
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalProducts: number = 0;
  totalPages: number = 0;
  constructor(
    private storeService: StoreService,
    private productService: ProductRequestService
  ) {}

  ngOnInit(): void {
    this.products$ = this.storeService.getProducts().pipe(
      map((response: any) => {
        const products = response.data;
        this.totalProducts = products.length;
        this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
        this.updatePaginatedProducts(products);
        return products;
      })
    );
    console.log(this.products$);
    console.log('Mounted');
    //this.products$ = this.storeService.getProducts();
    /*this.products$.subscribe((products) => {
      console.log(products); // This will log the products once the data is fetched
    });*/
  }
  loadProducts(): void {
    this.products$ = this.storeService.getProducts().pipe(
      map((response: any) => {
        console.log(response.data);
        return response.data;
      })
    );
  }
  updatePaginatedProducts(products: any[]): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = products.slice(start, end);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product', error);
      },
    });
  }
}
