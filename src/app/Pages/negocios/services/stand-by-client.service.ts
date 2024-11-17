import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StandByClientService {
  private url: string = "http://52.72.44.45:8000/"
  constructor(private http:HttpClient) { }

  getStandByClients(standById: number) {
    return this.http.get<any>(`${this.url}api/stand/seller/${standById}`);
  }
  getStandByClient(standId: number) {
    return this.http.get<any>(`${this.url}api/stand/${standId}`);
  }
  addRating(idBuyer:number, idStand:number, starss:number): Observable<any> {
    return this.http.post<any>(`${this.url}api/rate`,{idstand:idStand,idbuyer:idBuyer,stars:starss})
  }
}
