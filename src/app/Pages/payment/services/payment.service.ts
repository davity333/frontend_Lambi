import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellRequest } from '../models/sell-request';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private apiUrl = 'http://localhost:8000/api/protected';

    constructor(private http: HttpClient) {}

    createPayment(paymentDetails: SellRequest): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(`${this.apiUrl}/sell`, paymentDetails, { headers });
    }
}
