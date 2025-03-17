import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-section-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-section-1.component.html',
  styleUrl: './main-section-1.component.css',
})
export class MainSection1Component {
  @Input() product?: Product;

  constructor(private router: Router) {}

  goToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  goToCategory(event: Event): void {
    event.preventDefault();
    if (this.product?.category) {
      this.router.navigate(['/category', this.product.category]);
    }
  }

  // Helper method for calculating discounted price
  getDiscountedPrice(): number {
    if (!this.product?.price || !this.product?.discount) {
      return 0;
    }
    return this.product.price * (1 - this.product.discount);
  }
}