import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-allproduct',
  imports: [NgFor,NgIf,NgClass,FormsModule],
  templateUrl: './allproduct.component.html',
  styleUrl: './allproduct.component.css'
})



export class AllproductComponent{
  products: Product[] = [
    {
      _id: '1',
      name: 'Yellow Potatoes Whole Fresh, 5lb Bag',
      description: 'Fresh yellow potatoes in a 5lb bag.',
      price: 0.50,
      discount: 75,
      category: 'Vegetables',
      addedBy: 'admin',
      images: ['./assets/images/825.png'],
      stock: 10,
      reviews: ['Great quality!', 'Affordable price'],
      createdAt: '2025-03-01T12:00:00Z',
      updatedAt: '2025-03-05T14:00:00Z'
    },
    {
      _id: '2',
      name: 'Large Bagged Oranges',
      description: 'Sweet and juicy oranges.',
      price: 0.89,
      discount: 50,
      category: 'Fruits',
      addedBy: 'admin',
      images: ['./assets/images/821.png'],
      stock: 15,
      reviews: ['Very fresh!', 'Good value for money'],
      createdAt: '2025-02-28T10:30:00Z',
      updatedAt: '2025-03-05T11:45:00Z'
    },
    {
      _id: '3',
      name: 'Strawberries - 1lb',
      description: 'Fresh strawberries in a 1lb pack.',
      price: 1.50,
      discount: 30,
      category: 'Fruits',
      addedBy: 'seller123',
      images: ['./assets/images/833.png'],
      stock: 0,
      reviews: ['Very sweet!', 'Will buy again'],
      createdAt: '2025-03-02T09:15:00Z',
      updatedAt: '2025-03-06T13:20:00Z'
    }
  ];
  getDiscountedPrice(product: any): string {
    return (product.price - (product.price * (product.discount || 0) / 100)).toFixed(2);
}

getStars(rating: number): number[] {
    return Array(rating).fill(0);
}
}