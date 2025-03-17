import { Component ,inject} from '@angular/core';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  myCart: any = { products: [] };
  cartService=inject(CartService);

  
ngOnInit() {
  
this.loadCart();
}

loadCart(){
  this.cartService.getUserCart().subscribe((data:any) => {
    console.log('Cart Data:', data);
    this.myCart = data || {products :[]};


    });

}
}