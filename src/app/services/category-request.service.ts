import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../interfaces/category';


interface ProductResponse {
  message: string;
  existingCategory: Category;
}


@Injectable({
  providedIn: 'root'
})
export class CategoryRequestService {
  private apiUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) { }

  getCategoryList() : Observable<any>{
    return this.http.get(`${this.apiUrl}/getCategories`);
  }

  getCategoryById(id: string) :Observable<Category> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/getCategoryById/${id}`).pipe(
      map(response => {
        if (response && response.existingCategory) {
          return response.existingCategory;
        }
        throw new Error('Invalid category data format');
      })
    );
  }

  getCategoryByName(name: string): Observable<Category> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/getCategoryByName`, {
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

}
