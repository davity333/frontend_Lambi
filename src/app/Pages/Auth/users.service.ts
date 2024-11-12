import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin, UserRegister } from '../register/models/user';
import { Observable,map ,tap} from 'rxjs';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(readonly httpClient: HttpClient) { }
  private latitud : string = ""
  private altitud : string = ""
  
  createUser(user: UserRegister): Observable<any>{
    let url = "http://52.72.44.45:8000/api/registerBuyer/";
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });

    return this.httpClient.post<UserRegister>(url, user, { observe: 'response' });
  }
  setCoordernadas(lat: string, lng: string){
      this.latitud= lat;
      this.altitud = lng;
  }
  getCoordernadas(): Coordenadas{
    return {latitud: this.latitud, altitud: this.altitud} ;
  }
  login(userLogin: UserLogin): Observable<HttpResponse<any>> {
    let loginUrl = "http://52.72.44.45:8000/api/loginBuyer/";
    return this.httpClient.post<HttpResponse<any>>(loginUrl, userLogin, { observe: 'response' });
  }
  
  
getUser(): Observable<any> {
    let url = "http://52.72.44.45:8000/api/all/buyer";
    return this.httpClient.get<any>(url).pipe(tap({
      next: (response:any) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error getting users', err);
      }
    }))
  }
}
export interface Coordenadas {
  latitud: string;
  altitud: string;
}