import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "http://52.72.44.45:8000/api/"
  constructor(readonly http: HttpClient) { }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<any>(`${this.url}category`)
  }
  searchStandByCategory(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}stand/category/${id}`)
  }
}
