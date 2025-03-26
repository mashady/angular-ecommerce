import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { WishlistItem } from '../../../interfaces/wishlist';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  imports: [NgFor, NgIf],
})
export class WishlistComponent implements OnInit {
  wishlist: WishlistItem[] = []; // List of wishlist items
  wishlistCount: number = 0; // Counter for the wishlist items
  totalPrice: number = 0; // ✅ Total price counter

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (data: WishlistItem[]) => {
        console.log('🛠 Raw Wishlist Data:', data);
        this.wishlist = data.filter(item => item.productId !== null);
        this.wishlistCount = this.wishlist.length;        this.calculateTotalPrice(); 
        console.log('📌 Processed Wishlist Data:', this.wishlist);
      },
      error: (err) => {
        console.error('❌ Error fetching wishlist:', err);
      }
    });
  }

  

  calculateTotalPrice(): void {
    this.totalPrice = this.wishlist.reduce((sum, item) => sum + (item.productId?.price || 0), 0);
  }
  

    
  currentDate: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  removeFromWishlist(productId: string): void {
    console.log("Product ID to remove:", productId); // Add this line for debugging
    if (!productId) {
      console.error("❌ Error: Product ID is undefined");
      return;
    }
  
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        console.log("✅ Successfully removed item from wishlist");
        
        // Update the wishlist array
        this.wishlist = this.wishlist.filter(item => item.productId._id !== productId);
        
        // Recalculate the wishlist count and total price
        this.wishlistCount = this.wishlist.length;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error("❌ Error removing item from wishlist:", err);
      }
    });
  }
}