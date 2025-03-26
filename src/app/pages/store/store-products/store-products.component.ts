import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../../../services/store.service';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs/operators';
import { ProductRequestService } from '../../../services/product-request.service';
import { ConfirmDeleteModalComponent } from '../../../shared/confirm-delete-modal/confirm-delete-modal.component';
import { CategoryRequestService } from '../../../services/category-request.service';

@Component({
  selector: 'app-store-products',
  imports: [RouterLink, CurrencyPipe, AsyncPipe, NgFor, NgIf, ConfirmDeleteModalComponent],
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
  productIdToDelete: string | null = null;

  @ViewChild(ConfirmDeleteModalComponent) confirmDeleteModal!: ConfirmDeleteModalComponent;

  constructor(
    private storeService: StoreService,
    private productService: ProductRequestService,
    public categoryRequestService: CategoryRequestService
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
    console.log('Mounted');
  }
  getCategoryName(categoryId: string): Observable<any> {
    return this.categoryRequestService.getCategoryById(categoryId).pipe(
      map((category) => {
        console.log(category);
        return category.name;
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
    this.products$.subscribe(products => {
      this.updatePaginatedProducts(products);
    });
  }

  // fetch cat
  //this.CategoryRequestService.getCategoryById()


  openDeleteModal(productId: string): void {
    this.productIdToDelete = productId;
    if (this.confirmDeleteModal) {
      this.confirmDeleteModal.open(productId);
    }
  }

  closeModal(): void {
    this.productIdToDelete = null;
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log('Product deleted successfully');
        this.products$.subscribe(products => {
          this.updatePaginatedProducts(products);
        });
      },
      error: (error) => {
        console.error('Error deleting product', error);
      },
    });
  }
}
