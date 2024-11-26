import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "http://52.72.44.45:8000/api/"
  constructor(readonly http: HttpClient) { }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<any>(`${this.url}category`)
  }
  searchStandByCategory(id:number, idbuyer:number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}protected/favoriteWIthCategory/${id}/${idbuyer}`, {headers})
  }
  searchStandByName(name:string, idbuyer:number): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}protected/favoriteWIthName/${name}/${idbuyer}`, {headers})
  }
  addFavorite(idStand:number, idBuyer: number): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(`${this.url}protected/favorites`, {iduser:idBuyer, idstand:idStand}, {headers})
  }
  changeStatusTrue(idBuyer: number ,idStand:number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<any>(`${this.url}protected/changeToTrue/favorite/${idBuyer}/${idStand}`,null, {headers})
  }
  changeStatusFalse(idBuyer: number, idStand:number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<any>(`${this.url}protected/changeToFalse/favorite/${idBuyer}/${idStand}`, null, {headers})
  }
  getFavorites(idBuyer: number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}protected/favorite${idBuyer}`, {headers})
  }
  getStands():Observable<any>{
    return this.http.get<any>(`${this.url}favorite`)
  }
  getAllProducts():Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}protected/products/get`, {headers})
  }
  searchProducts(name:string):Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}products/found/product/${name}`, {headers})
  }
}
