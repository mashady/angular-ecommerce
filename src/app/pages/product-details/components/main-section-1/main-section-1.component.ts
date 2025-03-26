import { Component,ViewChild,ElementRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';
import {CounterServiceService} from "../../../../services/counter.service"
import { CartService } from "../../../../services/cart.service";
declare var bootstrap: any;
@Component({
  selector: 'app-main-section-1',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main-section-1.component.html',
  styleUrl: './main-section-1.component.css',
})
export class MainSection1Component {
  @Input() product?: Product;
  myCart: any = { products: [] };
  quantity:number=0;
  @ViewChild('errorToast', { static: true }) errorToast!: ElementRef;
  errorMessage: string = '';
  constructor(private router: Router, 
    private cartService: CartService,
    private counterService: CounterServiceService) {}

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

  addProductToCart(productId: string, quantity: number) {
    this.cartService.addProductToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        this.quantity=1;
        this.counterService.refreshCounter();
  
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
        this.showErrorToast('Error adding product to cart!');
        this.errorMessage = err.error;
      },
  });
  }
  
  increaseQuantity(product: any) {
    if (this.quantity < product.stock) {
      this.quantity++; 
    }
  }
  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--; 
    }
  }
  showErrorToast(message: string): void {
    this.errorMessage = message;
    const toast = new bootstrap.Toast(this.errorToast.nativeElement);
    toast.show();
  }
  
  
}
