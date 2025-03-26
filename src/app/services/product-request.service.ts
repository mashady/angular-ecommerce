import { HttpClient, HttpParams } from '@angular/common/http';
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

  addProduct(data: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/addProduct`, data);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/deleteProduct/${id}`);
  }

  updateProduct(id: string, data: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/updateProduct/${id}`, data);
  }
  // handle filering and sorting logic
  getProducts(query: string = '', categories: string[] = [], abovePrice: any = '', belowPrice: any = '', sortBy: string = 'latest', page: number = 1, limit: number = 20): Observable<any> {
    let params = new HttpParams()
      .set('query', query)
      //.set('aboveprice', abovePrice.toString())
      //.set('belowprice', belowPrice.toString())
      .set('sortBy', sortBy)
      .set('page', page.toString())
      .set('limit', limit.toString());

    categories.forEach(category => {
      params = params.append('category', category);
    });
    if (abovePrice > 0) {
      params = params.set('aboveprice', abovePrice.toString());
    }

    if (belowPrice > 0) {
      params = params.set('belowprice', belowPrice.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/allproducts`, { params });
  }


}
//allproducts
