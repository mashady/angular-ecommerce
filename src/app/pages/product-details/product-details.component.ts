import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 100,
    discount: 35,
    category: '',
    addedBy: '',
    updatedBy: '',
    images: [''],
    stock: 20,
    reviews: [''],
    createdAt: '',
    updatedAt: '',
  };
}
