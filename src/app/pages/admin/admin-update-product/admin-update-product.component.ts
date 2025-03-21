import { ProductRequestService } from './../../../services/product-request.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { CategoryRequestService } from '../../../services/category-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-admin-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-update-product.component.html',
  styleUrl: './admin-update-product.component.css'
})
export class AdminUpdateProductComponent {
  productForm !: FormGroup;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  existingImages: string[] = []; 
  submitting = false;
  categories !: Category[];
  productId : string = '';
  currProduct !: Product;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductRequestService,
    private fb: FormBuilder,
    private categoryService: CategoryRequestService)
  {  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0), Validators.max(10000)]],
      category: ['', [Validators.required]],
      discount: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      stock: [null, [Validators.required, Validators.min(0)]]
    });


    this.productId = this.route.snapshot.params['id'] || '';

    if(!this.productId) {
      console.error('No product ID provided');
      this.router.navigate(['/admin/products']);
      return;
    }

    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response.categories;
      },
      error: (error) => {
        console.error('Error Fetching Categories', error);
      }
    });

    this.loadProductData();
  }

  loadProductData() {
    this.productService.getSingleProduct(this.productId).subscribe({
      next: (product) => {
        this.currProduct = product;

        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category, 
          discount: product.discount,
          stock: product.stock
        });

        if( product.images && product.images.length ) {
          this.existingImages = product.images;
        }
      },
      error: (err) => {
        console.error('Error loading product', err);
      }
    });
  }

  onFilesSelect(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const newImages = Array.from(input.files);
      this.selectedImages = [...this.selectedImages, ...newImages];

      newImages.forEach( file => {
        const imageReader = new FileReader();
        imageReader.onload = () => {
          this.previewImages.push(imageReader.result as string);
        };
        imageReader.readAsDataURL(file);
      });
    }
  }

  removeNewImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  updateProduct(){
    if( this.productForm.invalid) {
      return;
    }

    this.submitting = true;

    const formData = new FormData();

    Object.keys(this.productForm.value).forEach( key => {
      formData.append(key, this.productForm.value[key]);
    });


    this.selectedImages.forEach((image) => {
      formData.append('images', image);
    });


    this.productService.updateProduct(this.productId, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully', response);
        this.submitting = false;
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('Error updating product', error);
        this.submitting = false;
      }
    });
  }


}
