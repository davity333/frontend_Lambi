import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PuestoService } from '../../../gestion-puesto/service/puesto.service';
import { tap } from 'rxjs';
import { Estados } from '../../../gestion-puesto/models/puestos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../Auth/users.service';
@Component({
  selector: 'app-datos-negocio',
  templateUrl: './datos-negocio.component.html',
  styleUrl: './datos-negocio.component.css'
})
export class DatosNegocioComponent implements OnInit{
  
  datos:FormGroup;

  constructor(private puesto: PuestoService, private user: UsersService){
    this.datos = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      no_house: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      estado: new FormControl(Number(''), [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  estados:Estados[]=[];
  phone:string[]=[];
  idSeller:number=16;
  image:string="png";
  latitud:string="";
  altitud:string="";

  municipio = [
    {nombre: "Tuxtla"},{nombre: "Suchiapa"},{nombre: "San cristobal de las casas"}
  ]

  ngOnInit(): void {
    this.puesto.getEstados().subscribe(
      (data) => {
        this.estados = data;
        console.log(this.estados);
        
      }
    )
  }



  publicar(){
    this.latitud = this.user.getCoordernadas().latitud;
    this.altitud = this.user.getCoordernadas().altitud;

    const phoneValue = this.datos.get('phone')?.value;
    if (phoneValue) {
      this.phone.push(phoneValue);
    }

    const datosNegocio = {
      ...this.datos.value,
      latitud: this.latitud,
      altitud: this.altitud,
      idSeller: this.idSeller,
      image: this.image,
      phone: this.phone
    };
    console.log(datosNegocio);
    
    this.user.createUser(datosNegocio).pipe(tap({
        next: (response) => {
          alert("Datos de negocio publicados con éxito");
          console.log(response);
        },
        error: (err) => {
          alert("Error con la API");
          console.error('Error creating user', err);
        }
  
    })).subscribe()
  }
}
