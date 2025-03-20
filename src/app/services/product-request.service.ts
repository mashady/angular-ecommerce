import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, map } from 'rxjs';

interface ProductResponse {
  message: string;
  existingProduct: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductRequestService {
  private apiUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  getProductsList(
    pageNumber: number = 1,
    productsCount: number = 10
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, {
      params: {
        page: pageNumber.toString(),
        limit: productsCount.toString(),
      },
    });
  }

  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products/${id}`).pipe(
      map((response) => {
        if (response && response.existingProduct) {
          return response.existingProduct;
        }
        throw new Error('Invalid product data format');
      })
    );
  }

  addProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/addProduct`, data);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/deleteProduct/${id}`);
  }

  updateProduct(id: string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/updateProduct/${id}`, data);
  }
}
