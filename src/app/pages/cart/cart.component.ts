import { Component ,inject,OnInit} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule } from '@angular/forms'; 
import {CounterServiceService} from "../../services/counter.service";
import { AccountService } from '../../services/account.service';
import { OrderService } from '../../services/order.service';
import {
  FormGroup,Validators,  ReactiveFormsModule,

} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NgFor, NgIf} from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,  ReactiveFormsModule,NgFor,NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  implements OnInit {
  selectedAddress: any = null;
  addresses!: any;
  promoCode: string = '';
  successMessage:string='';
  orderSuccessMessage:string='';
  epaySuccessMessage:string='';
  orderId: string | null = null;
  
  showAlert: boolean = false;
  errorMessage:string='';
  orderErrorMessage:string='';
  myCart: any = { products: [] };
  cartService=inject(CartService);
  router=inject(Router);
  counterService=inject(CounterServiceService);
  accountService=inject(AccountService);
  orderService=inject(OrderService);
  modalRef=inject(BsModalRef);
  fb=inject(FormBuilder);
  http=inject(HttpClient);
  addressForm!: FormGroup;
  apiError: string = '';
  isSubmitting: boolean = false;
  isAddingAddress: boolean = false;


ngOnInit() {
    this.addressForm = this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}$')]],
      });
      
      if (this.addresses && this.addresses.length > 0) {
        this.selectedAddress = this.removeId(this.addresses[0]); 
      }
this.loadCart();
  this.accountService.account$?.subscribe({
    next: (account: any) => {
      this.addresses = account.user.address;
      console.log(this.addresses);
    },
  });
}
get f() {
  return this.addressForm.controls;
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
        
      }
    }
  });
}


removeId(address: any) {
  const { _id, ...rest } = address;
  return rest;
}
isSelected(address: any) {
  return JSON.stringify(this.selectedAddress) === JSON.stringify(this.removeId(address));
}
toggleAddressForm() {
  this.isAddingAddress = !this.isAddingAddress;
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


confirmClearCart() {
  this.deleteCart();
  this.showAlert = false; 
}



onSubmit(): void {
    if (this.addressForm.valid && !this.isSubmitting) {
      const newAddress = this.addressForm.value;

      const cleanedAddress = { ...newAddress };
      delete cleanedAddress._id;

      this.isSubmitting = true;

      this.accountService.account$.pipe(take(1)).subscribe({
        next: (account) => {
          if (account) {
            const updatedAddresses = account.user.address.map(
              (address: any) => {
                const { _id, ...cleanedExistingAddress } = address;
                return cleanedExistingAddress;
              }
            );

            const isDuplicate = updatedAddresses.some(
              (existingAddress: any) =>
                existingAddress.address === cleanedAddress.address &&
                existingAddress.city === cleanedAddress.city &&
                existingAddress.country === cleanedAddress.country &&
                existingAddress.zip === cleanedAddress.zip
            );

            if (isDuplicate) {
              this.apiError = 'This address is already in your list.';
              this.isSubmitting = false;
              return;
            }

            updatedAddresses.push(cleanedAddress);

            this.accountService.addAddress(cleanedAddress).subscribe({
              next: () => {
                this.successMessage =
                  'Your address has been successfully added!';
                this.apiError = '';

                setTimeout(() => {
                  this.successMessage = '';
                }, 2000);
              },
              error: (err) => {
                if (err.error && err.error.errors) {
                  this.apiError = err.error.errors.join(', ');
                } else {
                  this.apiError = err.message;
                }
              },
              complete: () => {
                this.isSubmitting = false;
              },
            });
          }
        },
        error: (err) => {
          console.error('Error fetching account:', err);
          this.isSubmitting = false;
        },
      });
    }
  }


  handleCheckout() {
    if (!this.selectedAddress) {
      this.orderErrorMessage = " Please select a shipping address before proceeding.";
      return;
    }

    const selectedPaymentMethod = (document.querySelector('input[name="paymentMethod"]:checked') as HTMLInputElement)?.value;

    if (selectedPaymentMethod === "cash") {
      this.cashCheckOut(this.myCart._id, this.selectedAddress);
    } else if (selectedPaymentMethod === "epay") {
      this.ePayCheckOut(this.myCart._id, this.selectedAddress);
    } else {
      this.orderErrorMessage = "Please select a payment method.";
    }
  }
  
  
  cashCheckOut(cart: string, shippingAddress: any) {
    this.orderService.cashCheckOut(cart, shippingAddress).subscribe({
      next: (response) => {
        console.log("Order placed successfully!", response);
        this.orderSuccessMessage = response.status;
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          window.location.href = '/account/orders/' + response.data._id;
        }, 3000);

        this.loadCart();
        this.counterService.refreshCounter();
      },
      error: (err) => {
        console.error("Error placing order:", err);
        this.orderSuccessMessage = "";
        this.orderErrorMessage = err.error?.message || "An unexpected error occurred";
      },
    });
  }
  ePayCheckOut(cart: string, shippingAddress: any) {
    this.orderService.ePayCheckOut(cart, shippingAddress).subscribe({
      next: (response: any) => {
        console.log("Order initiated!", response);
        
        this.showAlert = true;
        this.counterService.refreshCounter()
        this.loadCart();
        this.epaySuccessMessage = "Please complete your payment...";
        window.open(response.url, '_blank');
        
         },
      error: (err) => {
        console.error("Payment error:", err);
        this.showAlert = true;
        this.orderErrorMessage = "Payment failed. Please try again.";
      },
    });
  }
  closeAlert(){
    this.showAlert = false;
  }
 
  
  }



  