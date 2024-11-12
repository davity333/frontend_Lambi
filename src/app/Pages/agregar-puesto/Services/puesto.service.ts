import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable,map ,tap} from 'rxjs';
import { Estados } from '../Models/estados';
import { Puesto, Pais, Estado, Municipio } from '../Models/estados';
@Injectable({
  providedIn: 'root'
})

export class PuestoService {

  constructor(readonly httpClient: HttpClient) { }
  private apiUrl = 'https://www.universal-tutorial.com/api';
  private token = 'Jnx1WfSC6w3Z4i6gpxMRF-fg89YzRj2AHO4gYOPDnrqgPFfsH-Bxfuyey1IEWUz07R4';

  getEstados(): Observable<Estados[]> {
    let url = "https://gaia.inegi.org.mx/wscatgeo/mgee/";
    return this.httpClient.get<any>(url).pipe(
      tap({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.error('Error getting Estados', err);
        }
      }),
      map((response) => response.datos.map((estado: any) => ({ nom_agee: estado.nom_agee })))
    );
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
