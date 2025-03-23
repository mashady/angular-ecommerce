import { ProductRequestService } from './../../../services/product-request.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { CategoryRequestService } from '../../../services/category-request.service';
@Component({
  selector: 'app-admin-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-add-product.component.html',
  styleUrl: './admin-add-product.component.css'
})
export class AdminAddProductComponent {
  productForm !: FormGroup;
  selectedImages: File[] = [];
  previewImages: string[] = [];
  submitting = false;
  categories !: Category[];

  constructor(
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

    this.categoryService.getCategoryList().subscribe({
      next: (response) => {
        this.categories = response.categories;
      },
      error: (error) => {
        console.error('Error Fetching Categories', error);
      }
    })
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

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  addProduct(){
    if( this.productForm.invalid) {
      return;
    }

    this.submitting = true;

    const formData = new FormData();

    Object.keys(this.productForm.value).forEach( key => {
      formData.append(key, this.productForm.value[key]);
    });


    this.selectedImages.forEach( (image) => {
      formData.append('images', image)
    })

    

    this.productService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        this.productForm.reset();
        this.selectedImages = [];
        this.previewImages = [];
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error adding product', error);
        this.submitting = false;
      }
    })
  }
}
