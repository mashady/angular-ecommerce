import { Component } from '@angular/core';
import { ProductRequestService } from '../../services/product-request.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {CounterServiceService} from "../../services/counter.service"
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products!: any;

  constructor(private productRequestService: ProductRequestService,private cartService: CartService,
      private counterService: CounterServiceService) {
    this.productRequestService.getProductsList().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
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
