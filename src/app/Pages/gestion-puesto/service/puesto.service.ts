import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable,map ,tap} from 'rxjs';
import { Estados } from '../models/puestos';
import { Puesto } from '../../agregar-puesto/Models/estados';
@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  constructor(readonly httpClient: HttpClient) { }

  getEstados() :Observable<Estados[]> {
    let url = "https://gaia.inegi.org.mx/wscatgeo/mgee/";
    return this.httpClient.get<any>(url).pipe(tap(
      {
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error('Error getting Estados', err);
        }
      }
    ),
    map(
      (response) => response.datos.map((estado: any) => ({ nom_agee: estado.nom_agee }))
    ))
  }

  agregarPuesto(puesto: Puesto): Observable<any>{
    let url = "http://52.72.44.45:8000/api/stand";
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });
    return this.httpClient.post<Puesto>(url, puesto);
  }

}
