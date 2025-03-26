import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestService } from '../../../services/product-request.service';
import { CategoryRequestService } from '../../../services/category-request.service';
import { Category } from '../../../interfaces/category';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-store-edit-product',
  templateUrl: './store-edit-product.component.html',
  styleUrls: ['./store-edit-product.component.css'],
  imports: [NgIf, ReactiveFormsModule, NgFor],
})
export class StoreEditProductComponent implements OnInit {
  productFormForSeller!: FormGroup;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  submitting = false;
  categories!: Category[];
  productId!: string;
  loading = false;
  errorMessage: string = '';

  constructor(
    private productService: ProductRequestService,
    private fb: FormBuilder,
    private categoryService: CategoryRequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;

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
      },
      error: (error) => {
        console.error('Error Fetching Categories', error);
      },
    });

    this.loading = true;
    this.productService.getSingleProduct(this.productId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.populateForm(response);
        this.previewImages = response.images || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching product', error);
        this.loading = false;
      },
    });
  }

  populateForm(product: any) {
    this.productFormForSeller.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      discount: product.discount,
      stock: product.stock,
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

  editProduct() {
    if (this.productFormForSeller.invalid) {
      return;
    }

    if (this.selectedImages.length === 0) {
      this.errorMessage = 'You must provide at least 1 image.';
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

    this.productService.updateProduct(this.productId, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully', response);
        this.router.navigate(['/store/products']);
        this.submitting = false;
        this.productFormForSeller.reset();
        this.selectedImages = [];
        this.previewImages = [];
      },
      error: (error) => {
        console.error('Error updating product', error);
        this.submitting = false;
        this.errorMessage =
          'An error occurred while updating the product. Please try again.';
      },
    });
  }
}
