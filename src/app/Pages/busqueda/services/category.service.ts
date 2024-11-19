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
  searchStandByCategory(id:number, idbuyer:number): Observable<any> {
    return this.http.get<any>(`${this.url}favoriteWIthCategory/${id}/${idbuyer}`)
  }
  searchStandByName(name:string, idbuyer:number): Observable<any>{
    return this.http.get<any>(`${this.url}favoriteWIthName/${name}/${idbuyer}`)
  }
  addFavorite(idStand:number, idBuyer: number): Observable<any>{
    return this.http.post<any>(`${this.url}favorites`, {iduser:idBuyer, idstand:idStand})
  }
  changeStatusTrue(idBuyer: number ,idStand:number): Observable<any> {
    return this.http.put<any>(`${this.url}changeToTrue/favorite/${idBuyer}/${idStand}`,null)
  }
  changeStatusFalse(idBuyer: number, idStand:number): Observable<any> {
    return this.http.put<any>(`${this.url}changeToFalse/favorite/${idBuyer}/${idStand}`, null)
  }
  getFavorites(idBuyer: number): Observable<any> {
    return this.http.get<any>(`${this.url}favorite${idBuyer}`)
  }
  getStands():Observable<any>{
    return this.http.get<any>(`${this.url}stand`)
  }
}
