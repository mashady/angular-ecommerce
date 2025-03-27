import { Review } from './review';

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  addedBy?: string;
  updatedBy?: string;
  images: string[];
  stock: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}
