import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../interfaces/category';
import { ProductRequestService } from '../../../services/product-request.service';
import { CategoryRequestService } from '../../../services/category-request.service';

@Component({
  selector: 'app-store-new-product',
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './store-new-product.component.html',
  styleUrl: './store-new-product.component.css',
})
export class StoreNewProductComponent {
  productFormForSeller!: FormGroup;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  submitting = false;
  categories!: Category[];
  constructor(
    private productService: ProductRequestService,
    private fb: FormBuilder,
    private categoryService: CategoryRequestService
  ) {}
  ngOnInit() {
    this.productFormForSeller = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10000)],
      ],
      category: ['', [Validators.required]],
      discount: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1)],
      ],
      stock: [null, [Validators.required, Validators.min(0)]],
    });

    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response.categories;
        console.log(response);
      },
      error: (error) => {
        console.error('Error Fetching Categories', error);
      },
    });
  }
  onFilesSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const newImages = Array.from(input.files);
      this.selectedImages = [...this.selectedImages, ...newImages];

      newImages.forEach((file) => {
        const imageReader = new FileReader();
        imageReader.onload = () => {
          this.previewImages.push(imageReader.result as string);
        };
        imageReader.readAsDataURL(file);
      });
    }
  }
  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  addProduct() {
    if (this.productFormForSeller.invalid) {
      return;
    }

    this.submitting = true;

    const formData = new FormData();

    Object.keys(this.productFormForSeller.value).forEach((key) => {
      formData.append(key, this.productFormForSeller.value[key]);
    });

    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        this.productFormForSeller.reset();
        this.selectedImages = [];
        this.previewImages = [];
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error adding product', error);
        this.submitting = false;
      },
    });
  }
}
