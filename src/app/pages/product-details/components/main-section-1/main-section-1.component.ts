import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ✅ Import this
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';
import {CounterServiceService} from "../../../../services/counter.service"
import { CartService } from "../../../../services/cart.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-main-section-1',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './main-section-1.component.html',
  styleUrl: './main-section-1.component.css',
})
export class MainSection1Component {
  @Input() product?: Product;
  reviewForm: FormGroup;
  myCart: any = { products: [] };
  quantity:number=0;
  errorMessage:string='';
  successMessage:string='';
  constructor(private router: Router, 
    private cartService: CartService,
    private counterService: CounterServiceService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    
  }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      productID: ['']
    });
  }

  addReview() {
    if (!this.reviewForm.valid) {
      return;
    }
    if(this.product) {
      this.reviewForm.value.productID = this.product._id;
      this.http.post('http://localhost:8088/review', this.reviewForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Review added successfully';
          this.reviewForm.reset();
          this.ngOnInit();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.Message;
        }
      });
    }
  }

  goToHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
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
        this.errorMessage = err.error.errors[0];
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


  
  
}