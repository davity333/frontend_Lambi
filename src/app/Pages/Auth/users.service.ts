import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(readonly httpClient: HttpClient) { }

  createUser(){
    let url = "http://52.72.44.45:8000/api/registerBuyer/";
    
  }
}
