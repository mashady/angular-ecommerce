import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryRequestService } from '../../../services/category-request.service';
import { Category } from '../../../interfaces/category';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  minValue: number = 0; // Minimum price
  maxValue: number = 10000; // Maximum price
  categories: Category[] = [];
  selectedCategories: string[] = []; // Track selected category IDs

  @Output() categoryFilterChange = new EventEmitter<string[]>(); // Emit selected categories
  @Output() priceFilterChange = new EventEmitter<{ min: number; max: number }>(); // Emit selected price range

 

  private router = inject(Router);
  private categoryService = inject(CategoryRequestService);

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        console.log('Categories fetched:', this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  goToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  // Handle checkbox changes
  onCategoryChange(categoryId: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedCategories.push(categoryId); // Add to selected categories
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId); // Remove from selected categories
    }
    this.categoryFilterChange.emit(this.selectedCategories); // Emit the updated list
  }

  // Handle price range changes
  onPriceChange(): void {
    this.priceFilterChange.emit({ min: this.minValue, max: this.maxValue }); // Emit the selected price range
  }
}