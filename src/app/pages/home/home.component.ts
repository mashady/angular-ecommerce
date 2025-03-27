import { Component,ViewChild,ElementRef } from '@angular/core';
import { ProductRequestService } from '../../services/product-request.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {CounterServiceService} from "../../services/counter.service"
import { CartService } from "../../services/cart.service";
import { WishlistService} from '../../services/wishlist.service';
import { CommonModule } from '@angular/common'; 
declare var bootstrap: any; 

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe, NgFor, NgIf, RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products!: any;
  wishlistProductIds: string[] = [];
  errorMessage:string='';
  @ViewChild('errorToast', { static: true }) errorToast!: ElementRef;

  constructor(private productRequestService: ProductRequestService,private cartService: CartService,private wishListService:WishlistService,
      private counterService: CounterServiceService) {
    this.productRequestService.getProductsList().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
    });
  }
  ngOnInit(): void {
    this.loadWishlist();
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

  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this.wishListService.removeFromWishlist(productId).subscribe({
        next: () => {
          this.wishlistProductIds = this.wishlistProductIds.filter(id => id !== productId);
          this.counterService.refreshWishCounter(); 
          this.errorMessage ='';
        },
        error: (error) => {
          console.error("Error removing from wishlist:", error);
          this.showErrorToast("Failed to remove from wishlist. Please try again.");
          this.errorMessage = error.error;


        }
      });
    } else {
      this.wishListService.addToWishlist(productId).subscribe({
        next: () => {
          this.wishlistProductIds.push(productId);
          this.counterService.refreshWishCounter(); 
          this.errorMessage ='';

        },
        error: (error) => {
          console.error("Error adding to wishlist:", error);
          this.showErrorToast("Failed to add to wishlist. Please try again.");
          this.errorMessage = error.error;
        }
      });
    }
  }


  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }

  addProductToCart(productId: string, quantity: number) {
    this.cartService.addProductToCart(productId, quantity).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
        this.counterService.refreshCounter();
        this.errorMessage ='';

  
      },
      error: (err) => {
       console.error('Error adding product to cart:', err);
       this.showErrorToast('Error adding product to cart');
       this.errorMessage = err.error;

        },
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
  showErrorToast(message: string): void {
    this.errorMessage = message;
    const toast = new bootstrap.Toast(this.errorToast.nativeElement);
    toast.show();
  }
  

}
