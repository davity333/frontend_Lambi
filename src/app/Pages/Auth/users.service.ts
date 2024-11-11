import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../register/models/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(readonly httpClient: HttpClient) { }

  createUser(user: UserRegister): Observable<UserRegister>{
    let url = "http://52.72.44.45:8000/api/registerBuyer/";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<UserRegister>(url, user);
  }
}
