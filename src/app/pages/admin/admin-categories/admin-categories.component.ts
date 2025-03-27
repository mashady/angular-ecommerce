import { Component } from '@angular/core';
import { CategoryRequestService } from '../../../services/category-request.service';
import { Category } from '../../../interfaces/category';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-categories',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent {
  categories: Category[] = [];
  submitting = false;
  categoryForm !: FormGroup;
  mode: string = 'add';
  id: string | undefined = undefined;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private categoryService: CategoryRequestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(
      (response) => {
        this.categories = response.categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
        this.errorMessage = error.error.Message;
        this.successMessage = null;
        this.ngOnInit();
      }
    );

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    });
  }

  addCategory() {
    if(this.categoryForm.invalid) {
      return;
    }

    this.submitting = true;

    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (response) => {
        console.log('Category added successfully', response);
        this.categoryForm.reset();
        this.submitting = false;
        
        this.successMessage = 'Category added successfully';
        this.errorMessage = null;
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding category', error);
        this.submitting = false;
        this.errorMessage = error.error.Message;
        this.successMessage = null;
        this.ngOnInit();        
      }
    })
  } 

  getCategoryData(category: Category) {
    this.categoryForm.patchValue({
      name: category.name
    });

    this.mode = 'edit';
    this.id = category._id!;
  }

  deleteCategory(id: string) {
    this.submitting = true;

    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log('Category deleted successfully', response);
        this.submitting = false;
        this.mode = 'add';
        this.id = undefined;
        this.categoryForm.reset();
        const modalElement = document.getElementById('deleteCategory' + id);
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
        
        this.successMessage = 'Category deleted successfully';
        this.errorMessage = null;
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting category', error);
        this.submitting = false;
        this.errorMessage = error.error.Message;
        this.successMessage = null;
        this.ngOnInit();        
      }
    })
  }

  updateCategory(id: string) {
    if(this.categoryForm.invalid) {
      return;
    }
  
    this.submitting = true;
  
    this.categoryService.updateCategory(id, this.categoryForm.value).subscribe({
      next: (response) => {
        console.log('Category updated successfully', response);
        this.categoryForm.reset();
        this.submitting = false;
        this.mode = 'add';
        this.id = undefined; 
        
        this.successMessage = 'Category updated successfully';
        this.errorMessage = null;
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating category', error);
        this.submitting = false;
        this.errorMessage = error.error.Message;
        this.successMessage = null;  
        this.ngOnInit();      
      }
    })
  }

  
}
