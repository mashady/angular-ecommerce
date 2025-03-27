import { Component,ViewChild,ElementRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
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
  reviewForm: FormGroup = new FormGroup({});
  myCart: any = { products: [] };
  quantity:number=0;
  errorMessage:string='';
  successMessage:string='';
  @ViewChild('errorToast', { static: true }) errorToast!: ElementRef;
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
    if(!this.reviewForm) {
      return;
    }
    if (!this.reviewForm.valid || !this.product?._id) {
      return;
    }
    
    const reviewData = {
      ...this.reviewForm.value,
      productId: this.product._id
    };

    this.http.post('http://localhost:8088/review', reviewData).subscribe({
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