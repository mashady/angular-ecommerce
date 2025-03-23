import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../interfaces/category';

<<<<<<< HEAD
interface ProductResponse {
  message: string;
  existingCategory: Category;
}
interface CategoryResponse {
  Message: string;
  categories: Category[];
}
=======

interface CategoryResponse {
  message: string,
  existingCategory: Category;
}

interface CategoriesResponse {
  Message: string,
  categories: Category[]; 
}


>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f
@Injectable({
  providedIn: 'root',
})
export class CategoryRequestService {
  private apiUrl = 'http://localhost:8088';

<<<<<<< HEAD
  constructor(private http: HttpClient) {}
  getCategoryList(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/getCategories`).pipe(
      map((response) => response.categories) 
=======
  constructor(private http: HttpClient) { }

  getCategoryList() : Observable<any>{
    return this.http.get<CategoriesResponse>(`${this.apiUrl}/getCategories`);
  }

  getCategoryById(id: string) :Observable<Category> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/getCategoryById/${id}`).pipe(
      map(response => {
        if (response && response.existingCategory) {
          return response.existingCategory;
        }
        throw new Error('Invalid category data format');
      })
>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f
    );
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http
      .get<ProductResponse>(`${this.apiUrl}/getCategoryById/${id}`)
      .pipe(
        map((response) => {
          if (response && response.existingCategory) {
            return response.existingCategory;
          }
          throw new Error('Invalid category data format');
        })
      );
  }

  getCategoryByName(name: string): Observable<Category> {
<<<<<<< HEAD
    return this.http
      .get<ProductResponse>(`${this.apiUrl}/getCategoryByName`, {
        params: {
          name: name,
        },
=======
    return this.http.get<CategoryResponse>(`${this.apiUrl}/getCategoryByName`, {
      params: {
        name: name
      }
    }).pipe(
      map(response => {
        if (response && response.existingCategory) {
          return response.existingCategory;
        }
        throw new Error('Invalid category data format');
>>>>>>> cbf4d539675e0aa57cf095b461ebae243f42fb3f
      })
      .pipe(
        map((response) => {
          if (response && response.existingCategory) {
            return response.existingCategory;
          }
          throw new Error('Invalid category data format');
        })
      );
  }
}
