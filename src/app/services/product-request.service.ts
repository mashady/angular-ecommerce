import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface ProductResponse {
  message: string;
  existingProduct: Product;
}

@Injectable({
  providedIn: 'root',
  providedIn: 'root',
})
export class ProductRequestService {
  private apiUrl = 'http://localhost:8088/products';

  constructor(private http: HttpClient) {}
  constructor(private http: HttpClient) {}

  getProductsList(
    pageNumber: number = 1,
    productsCount: number = 10
  ): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, {
<<<<<<< HEAD
  getProductsList(pageNumber: number = 1, productsCount: number = 10): Observable<{ data: Product[], totalProducts: number }> {
    return this.http.get<{ message: string; totalProducts: number; data: Product[] }>(this.apiUrl, {
      params: {
        page: pageNumber.toString(),
        limit: productsCount.toString(),
      },
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
=======
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
      map((response) => {
>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f
        if (response && response.existingProduct) {
          return response.existingProduct;
        }
        throw new Error('Invalid product data format');
      }),
      catchError(this.handleError)
    );
  }

  addProduct(data: FormData): Observable<Product> {
<<<<<<< HEAD
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
=======
  addProduct(data: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/addProduct`, data);
  }

  deleteProduct(id: string): Observable<Product> {
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/deleteProduct/${id}`);
  }

  updateProduct(id: string, data: FormData): Observable<Product> {
  updateProduct(id: string, data: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/updateProduct/${id}`, data);
  }
}

>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f
