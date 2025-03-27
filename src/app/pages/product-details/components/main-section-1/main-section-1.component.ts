import { Component,ViewChild,ElementRef, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../interfaces/product';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import {CounterServiceService} from "../../../../services/counter.service"
import { CartService } from "../../../../services/cart.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WishlistService } from '../../../../services/wishlist.service';
// import { ProductRequestService } from '../../../../services/product-request.service';

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
  loginErrorMessage:string='';
  successMessage:string='';
  wishlistProductIds: string[] = [];
  @ViewChild('errorToast', { static: true }) errorToast!: ElementRef;
  constructor(private router: Router, 
    private cartService: CartService,
    private counterService: CounterServiceService,
    private wishListService:WishlistService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    
  }

  ngOnInit() {
    this.loadWishlist();
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
      productID: this.product?._id
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
        this.loginErrorMessage ='';  
      },
      error: (err) => {
        this.showErrorToast('Error adding product to cart!');
        this.loginErrorMessage = err.error.errors||err.error;
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
    this.loginErrorMessage = message;
    const toast = new bootstrap.Toast(this.errorToast.nativeElement);
    toast.show();
  }
  loadWishlist(): void {
    this.wishListService.getWishlist().subscribe({
      next: (wishlist) => {
        this.wishlistProductIds = wishlist
          .map(item => item.productId?._id)
          .filter((id): id is string => !!id); // Remove undefined values
      },
      error: () => {
        console.error('Failed to load wishlist');
      }
    });
  }
  addToWishlist(productId: string) {
    this.wishListService.addToWishlist(productId).subscribe({
      next: (response) => {
        console.log('Product added to Wishlist:', response);
        this.counterService.refreshWishCounter();

      },
      error: (err) => {
        console.error('Error adding product to Wishlist:', err);

        },
  });
  }
  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this.wishListService.removeFromWishlist(productId).subscribe({
        next: () => {
          this.wishlistProductIds = this.wishlistProductIds.filter(id => id !== productId);
          this.counterService.refreshWishCounter(); 
          this.loginErrorMessage ='';

        },
        error: (error) => {
          console.error("Error removing from wishlist:", error);
          this.showErrorToast("Failed to remove from wishlist. Please try again.");
          this.loginErrorMessage = error.error;


        }
      });
    } else {
      this.wishListService.addToWishlist(productId).subscribe({
        next: () => {
          this.wishlistProductIds.push(productId);
          this.counterService.refreshWishCounter(); 
          this.loginErrorMessage ='';
        },
        error: (error) => {
          console.error("Error adding to wishlist:", error);
          this.showErrorToast("Failed to add to wishlist. Please try again.");
          this.loginErrorMessage = error.error;
        }
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }
  
}