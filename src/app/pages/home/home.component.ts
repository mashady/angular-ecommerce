import { Component } from '@angular/core';
import { ProductRequestService } from '../../services/product-request.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {CounterServiceService} from "../../services/counter.service"
import { CartService } from "../../services/cart.service";
import { WishlistService} from '../../services/wishlist.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe, NgFor, NgIf, RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products!: any;
  wishlistProductIds: string[] = [];

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
      this.wishListService.removeFromWishlist(productId).subscribe(() => {
        this.wishlistProductIds = this.wishlistProductIds.filter(id => id !== productId);
        this.counterService.refreshWishCounter(); 
      });
    } else {
      this.wishListService.addToWishlist(productId).subscribe(() => {
        this.wishlistProductIds.push(productId);
        this.counterService.refreshWishCounter(); 
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
  
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
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
  
  

}
