import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StandByClientService {
  private url: string = "http://52.72.44.45:8000/api/stand/seller/"
  constructor(private http:HttpClient) { }

  getStandByClients(standById: number) {
    return this.http.get<any>(`${this.url}${standById}`);
  }
}
