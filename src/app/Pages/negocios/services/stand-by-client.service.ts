import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../gestion-productos/Models/product';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { SellRequest } from '../../payment/models/sell-request';
@Injectable({
  providedIn: 'root'
})
export class StandByClientService {
  private url: string = "http://52.72.44.45:8000/"
  carrito: any[] = [];
  private nameStand:string = "";
  private nameBuyer:string = "";
  private phoneBuyer:string = "";
  constructor(private http:HttpClient) { }

  getStandByClients(standById: number) {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}api/protected/stand/seller/${standById}`, {headers});
  }
  getStandByClient(standId: number) {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}api/protected/standWithRating/${standId}`, {headers});
  }
  addRating(idBuyer:number, idStand:number, starss:number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(`${this.url}api/protected/rate`,{idstand:idStand,idbuyer:idBuyer,stars:starss}, {headers})
  }

  getProductsStand(staindId: number): Observable<Product[]> {

      let url = `http://52.72.44.45:8000/api/productsWithStandId/${staindId}`;
      return this.http.get<Product[]>(url);
  }
  updateRatingStand(idStand: number,idBuyer: number, rating: number): Observable<any> {
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<any>(`${this.url}api/protected/rate?idstand=${idStand}&idbuyer=${idBuyer}`, {stars: rating}, {headers});
  }
  getNameStand(){
    return this.nameStand;
  }
  getNameBuyer(){
    return this.nameBuyer;
  }
  setNameStand(nameStand:string){
    this.nameStand = nameStand;
  }
  setNameBuyer(nameBuyer:string){
    this.nameBuyer = nameBuyer;
  }
  setPhoneBuyer(phoneBuyer:string){
    this.phoneBuyer = phoneBuyer;
  }
  getPhoneBuyer(){
    return this.phoneBuyer;
  }
  createSell(sell : SellRequest): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<any>(`${this.url}api/protected/sell`, sell, {headers});
  }
  getSellsByStandId(standId: number): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.url}api/sell/products/${standId}`, {headers});
  }
  }


