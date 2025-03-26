import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRequestService } from '../../services/product-request.service';
import { CategoryRequestService } from '../../services/category-request.service';
import { NgIf, NgFor, NgClass, LowerCasePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  inStock?: boolean;
  images?: any;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports:[NgIf,NgFor,NgClass,LowerCasePipe,FormsModule, ReactiveFormsModule,RouterLink, NgIf,CurrencyPipe]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategories: string[] = [];
  searchQuery: string = '';
  abovePrice: number = 0;
  belowPrice: number = 500;
  sortBy: string = 'latest';
  page: number = 1;
  totalPages: number = 1;
  viewMode: 'grid' | 'list' = 'grid';

  productForm: FormGroup;

  constructor(
    private productService: ProductRequestService,
    private categoryService: CategoryRequestService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      searchQuery: [''],
      selectedCategories: this.fb.array([]),
      abovePrice: [0],
      belowPrice: [30],
      sortBy: ['latest'],
      page: [1],
    });
  }

  ngOnInit(): void {
    console.log("nnnnn");
    this.getProducts();
    this.productService.getSearchQuery().subscribe({
      next: (data:any) => {
        console.log(data);
      },
      error: (error:any) => {
        console.log(error);
      }
    })
    console.log(this.productService.getSearchQuery());
    console.log("qqqqqqqqqqqqq",this.searchQuery);

    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response.categories;
      },
      error: (error) => {
        console.error('Error Fetching Categories', error);
      }
    });
  }

  get selectedCategoriesArray(): FormArray {
    return this.productForm.get('selectedCategories') as FormArray;
  }

  getCheckboxControl(categoryName: string): any {
    return this.fb.control(false);
  }

  // When the user toggles a category
 /* onCategoryChange(): void {
    this.selectedCategories = this.selectedCategoriesArray
      .controls
      .filter(control => control.value)
      .map((control, index) => this.categories[index].name);
    console.log('Selected categories:', this.selectedCategories);
    this.page = 1;
    this.getProducts();
  }*/

  onCategoryChange(categoryName: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryName);
    this.getProducts();

      console.log(this.selectedCategories);
    } else {
      const index = this.selectedCategories.indexOf(categoryName);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }

    console.log('Selected Categories:', this.selectedCategories);
  }

  addCheckboxes(): void {
    this.categories.forEach(category => {
      const control = this.getCheckboxControl(category.name);
      this.selectedCategoriesArray.push(control);
    });
  }

  getProducts(): void {
    console.log('Fetching products with query parameters:', {
      query: this.productService.getSearchQuery(),
      categories: this.selectedCategories,
      abovePrice: this.abovePrice,
      belowPrice: this.belowPrice,
      sortBy: this.sortBy,
      page: this.page,
    });

    this.productService.getProducts(
      this.productService.getSearchQuery(),
      this.selectedCategories,
      this.abovePrice,
      this.belowPrice,
      this.sortBy,
      this.page,
      20
    ).subscribe(response => {
      this.products = response.data;
      this.totalPages = response.totalPages;
      console.log('All products', this.products);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

  changePage(page: number): void {
    this.page = page;
    this.getProducts();
  }

  onPriceChange(): void {
    this.page = 1;
    this.getProducts();
  }

  onSortChange(): void {
    this.page = 1;
    this.getProducts();
  }

  onSearchSubmit(): void {
    console.log('Search submitted with:', this.searchQuery);
    this.page = 1;
    this.getProducts();
  }

  toggleViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }


}
