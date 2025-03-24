import { Component } from '@angular/core';
import { ProductRequestService } from '../../services/product-request.service';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgClass, CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products!: any;

  constructor(private productRequestService: ProductRequestService) {
    this.productRequestService.getProductsList().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
      },
    });
  }
}
