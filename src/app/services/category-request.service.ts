import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../interfaces/category';


interface CategoryResponse {
  message: string,
  existingCategory: Category;
}

interface CategoriesResponse {
  Message: string,
  categories: Category[]; 
}


@Injectable({
  providedIn: 'root'
})
export class CategoryRequestService {
  private apiUrl = 'http://localhost:8088';

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
    );
  }

  getCategoryByName(name: string): Observable<Category> {
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
      })
    );
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post<CategoryResponse>(`${this.apiUrl}/addCategory`, category);
  }

  updateCategory(id: string, category: Category): Observable<any> {
    return this.http.put<CategoryResponse>(`${this.apiUrl}/updateCategory/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<CategoryResponse>(`${this.apiUrl}/deleteCategory/${id}`);
  }

}
