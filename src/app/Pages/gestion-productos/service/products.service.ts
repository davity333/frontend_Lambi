import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { CategoryProduct } from '../Models/categoryProduct';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(readonly httpClient:HttpClient) { }

  getProducts(): Observable<Product[]> {
    let url = 'http://52.72.44.45:8000/api/products/';
    return this.httpClient.get<Product[]>(url);
  }
  getCategorys(): Observable<CategoryProduct[]> {
    let url = 'http://52.72.44.45:8000/api/categoryproducts/';
    return this.httpClient.get<CategoryProduct[]>(url);
  }
  postProduct(product: any): Observable<Product>{
    let url = 'http://52.72.44.45:8000/api/products/';
    return this.httpClient.post<Product>(url, product);
  }
}
