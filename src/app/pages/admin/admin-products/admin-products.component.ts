import { Component } from '@angular/core';
import { ProductRequestService } from '../../../services/product-request.service';
import { Product } from '../../../interfaces/product';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-products',
  imports: [CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  products !: Product[];

  constructor (
    private productService: ProductRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProductsList(1,6).subscribe({
      next: (response) => {
        this.products = response.data;
      } 
    });
  }

  updateProduct(event: Event, id : any) {
    event.preventDefault();
    if(id){
      this.router.navigate(['products/update/'+id]);
    }
    
  }
}
