export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  addedBy: string;
  updatedBy?: string;
  images: string[];
  stock: number;
  reviews?: string[];
  createdAt: string;
  updatedAt: string;
}
