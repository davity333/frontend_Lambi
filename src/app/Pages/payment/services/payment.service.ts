import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellRequest } from '../models/sell-request';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8000';  // URL de tu API

  constructor(private http: HttpClient) {}

  createPayment(paymentDetails: SellRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/sell`, paymentDetails);
  }
}
