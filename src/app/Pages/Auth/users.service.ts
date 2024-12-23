import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin, UserRegister } from '../register/models/user';
import { Observable,map ,tap} from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface Coordenadas {
  latitud: number;
  altitud: number;
}
@Injectable({
  providedIn: 'root'
})

export class createSellerUsersService {

  constructor(readonly httpClient: HttpClient) { }
  private latitud : number = 0
  private altitud : number = 0
  seller : boolean = false
  idSeller : number = 0
  private urlSeller : string = "http://52.72.44.45:8000/sellers"
  createUser(user: UserRegister): Observable<any>{
    let url = "http://52.72.44.45:8000/api/registerBuyer/";
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });

    return this.httpClient.post<UserRegister>(url, user, { observe: 'response' });
  }
  setCoordernadas(lat: number, lng: number) {
    this.latitud = lat;
    this.altitud = lng;
    console.log("Coordenadas guardadas en el servicio: Latitud - " + this.latitud + ", Longitud - " + this.altitud);
  }
  // Método para obtener las coordenadas como string
  getCoordernadas(): Coordenadas {
    return { latitud: this.latitud, altitud: this.altitud };
  }
  login(userLogin: UserLogin): Observable<HttpResponse<any>> {
    let loginUrl = "http://52.72.44.45:8000/api/loginBuyer/";
    return this.httpClient.post<HttpResponse<any>>(loginUrl, userLogin, { observe: 'response' });
  }
  createSeller(user: UserRegister):Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(`${this.urlSeller}`, user, { observe: 'response' })

  }
  
  loginSeller(userLogin : UserLogin): Observable<HttpResponse<any>> {
    let loginUrl = "http://52.72.44.45:8000/loginSeller/";
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

  isLogged() :boolean{
    return localStorage.getItem('token') ? true : false;
  }

  getStatusSeller() :boolean{
    return this.seller;
  }

  setStatusSeller(status: boolean){
    this.seller = status;
  }


  isStatusSeller():boolean{
    return localStorage.getItem('seller') ? true : false;
  }
}
