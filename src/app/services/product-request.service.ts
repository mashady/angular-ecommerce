import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, catchError, map, throwError } from 'rxjs';

interface ProductResponse {
  message: string;
  existingProduct: Product;
}

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService {
  private apiUrl = 'http://localhost:8088/products';

  constructor(private http: HttpClient) { }

  getProductsList(pageNumber: number = 1, productsCount: number = 10): Observable<any> {
    return this.http.get(this.apiUrl, {
      params: {
        page: pageNumber.toString(),
        limit: productsCount.toString()
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getSingleProduct(id: string): Observable<Product> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        console.log('API response:', response);
        // Extract the product from the nested structure
        if (response && response.existingProduct) {
          return response.existingProduct;
        }
        throw new Error('Invalid product data format');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}