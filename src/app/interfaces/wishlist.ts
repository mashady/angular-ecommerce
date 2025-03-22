export interface WishlistItem {
    productId: Product;
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    category: string;
    images: string[];
    stock: number;
    reviews: any[];  
  }