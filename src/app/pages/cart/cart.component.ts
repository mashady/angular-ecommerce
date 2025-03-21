import { Component ,inject,OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import {CounterServiceService} from "../../services/counter.service";
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  address:string='';
  promoCode: string = '';
  successMessage:string='';
  errorMessage:string='';
  myCart: any = { products: [] };
  cartService=inject(CartService);
  counterService=inject(CounterServiceService);
  accountService=inject(AccountService);
  private subscriptions: Subscription = new Subscription();

ngOnInit() {
  
this.loadCart();
this.subscriptions.add(
  this.accountService.account$.subscribe((account) => {
    this.address = account?.address || '';
    console.log('User Address:', this.address);
  })
);

}

loadCart() {
  this.cartService.getUserCart().subscribe({
    next: (data: any) => {
      console.log('Cart Data:', data);
      this.myCart = data || { products: [] };
    },
    error: (err) => {
      console.log('Error fetching cart:', err);
      if (err.status === 404) {
        console.log('Cart not found. Resetting to empty cart.');
        this.myCart = { products: [] };
      } else {
        alert('Failed to load cart. Please try again.');
      }
    }
  });
}

addProductToCart(productId: string, quantity: number) {
  this.cartService.addProductToCart(productId, quantity).subscribe({
    next: (response) => {
      console.log('Product added to cart:', response);
      this.loadCart();
      this.counterService.refreshCounter();

    },
    error: (err) => {
      console.error('Error adding product to cart:', err);
      },
});
}


reduceProductQuantity(productId: string, quantity: number) {
this.cartService.reduceProductQuantity(productId, quantity).subscribe({
next: (response) => {
  console.log('Product quantity to cart:', response);
  this.loadCart();
  this.counterService.refreshCounter();
},
error: (err) => {
  console.log('Error reduce  product  quantity from cart:', err);
  },
});
}


addPromoCode(promocode: string) {
  this.cartService.addPromoCode(promocode).subscribe({
    next: (response) => {
      console.log('PromoCode added to cart:', response);
      this.loadCart();
      this.successMessage = response.message;
      this.errorMessage = "";
    },
    error: (err) => {
      console.error('Error adding promoCode to cart:', err);
      if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
        this.successMessage = "";
      } else if (err.error && typeof err.error === 'string') {
        this.errorMessage = err.error;
      }

      },
});
}


deleteCart() {
this.cartService.deleteCart().subscribe({
next: (response) => {
  console.log('cart deleted sucessfully!', response);
  this.loadCart()
  this.counterService.refreshCounter();
},
error: (err) => {
  console.error('Error!', err);},
});
}


deleteFromCart(productId: string) {
  this.cartService.deleteFromCart(productId).subscribe({
    next: (response) => {
      console.log('Product deleted Sucessfully from cart:', response);
      this.myCart.products = this.myCart.products.filter((p: any) => p._id !== productId);
      this.loadCart();
      this.counterService.refreshCounter();

    },
    error: (err) => {
      console.error('Error delete  product  from cart:', err);
      },
});
}
}