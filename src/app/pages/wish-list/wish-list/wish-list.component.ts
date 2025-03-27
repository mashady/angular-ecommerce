import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { CartService } from '../../../services/cart.service';
import { WishlistItem } from '../../../interfaces/wishlist';
import { NgFor, NgIf } from '@angular/common';
import { CounterServiceService } from '../../../services/counter.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  imports: [NgFor, NgIf],
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = []; 
  wishlistCount: number = 0; 
  totalPrice: number = 0; 
  

  constructor(private wishlistService: WishlistService,private cartService:CartService,private counterService: CounterServiceService) {}

  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (data: WishlistItem[]) => {
        console.log(' Raw Wishlist Data:', data);
        this.wishlist = data.filter(item => item.productId !== null);
        this.wishlistCount = this.wishlist.length; this.calculateTotalPrice(); 
        console.log(' Processed Wishlist Data:', this.wishlist);
      },
      error: (err) => {
        console.error(' Error fetching wishlist:', err);
      }
    });
  }

  

  calculateTotalPrice(): void {
    this.totalPrice = this.wishlist.reduce((sum, item) => sum + (item.productId?.price || 0), 0);
  }
  

    
  currentDate: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  removeFromWishlist(productId: string): any {
    console.log("Product ID to remove:", productId); 
    if (!productId) {
      console.error(" Error: Product ID is undefined");
      return;
    }
  
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        console.log(" Successfully removed item from wishlist");
        
        this.wishlist = this.wishlist.filter(item => item.productId._id !== productId);
        
        this.wishlistCount = this.wishlist.length;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error(" Error removing item from wishlist:", err);
      }
    });
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



}