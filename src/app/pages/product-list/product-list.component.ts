import { Component } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AllproductComponent } from './allproduct/allproduct.component';

@Component({
  selector: 'app-product-list',
  imports: [SideBarComponent, AllproductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  selectedCategories: string[] = []; 
  onCategoryFilterChange(selectedCategories: string[]): void {
    this.selectedCategories = selectedCategories;
  }
}
