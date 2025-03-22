import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { Product } from '../../../interfaces/product';
import { WishlistItem } from '../../../interfaces/wishlist';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  imports:[NgClass,NgFor,NgIf],
  selector: 'app-wishlist',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];
  currentDate: string = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.wishlistService.getWishlist().subscribe((data:WishlistItem[]) => {
      this.wishlist = data.map(item => item.productId);
    });
  }
  removeFromWishlist(productId: string): void {
    this.wishlist = this.wishlist.filter(item => item._id !== productId);
  }
}
