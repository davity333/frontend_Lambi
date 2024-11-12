import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PuestoService } from '../../Services/puesto.service';
import { tap } from 'rxjs';
import { Estados, Estado, Pais, Municipio } from '../../Models/estados';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../Auth/users.service';


@Component({
  selector: 'app-datos-negocio',
  templateUrl: './datos-negocio.component.html',
  styleUrl: './datos-negocio.component.css'
})
export class DatosNegocioComponent implements OnInit {

  datos: FormGroup;

  constructor(private puesto: PuestoService, private user: UsersService) {
    this.datos = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(1, [Validators.required]),
      street: new FormControl('', [Validators.required]),
      no_house: new FormControl('', [Validators.required]), 
      colonia: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
    });
  }

  estados: Estados[] = [];
  phone: string[] = [];
  idSeller: number = 16;
  image: string = "png";
  latitud: string = "";
  altitud: string = "";

  municipio = [
    { nombre: "Tuxtla" }, { nombre: "Suchiapa" }, { nombre: "San cristobal de las casas" }
  ];

  ngOnInit(): void {
    this.puesto.getEstados().subscribe(
      (data) => {
        this.estados = data;
        console.log(this.estados);
      }
    );
  }

  publicar() {
    const phoneValue = this.datos.get('phone')?.value;
    if (phoneValue) {
      this.phone.push(phoneValue.toString());
    }
  
    const coordenadas = this.user.getCoordernadas();
    const datosNegocio = {
      ...this.datos.value,
      category: 1,
      latitud: coordenadas.latitud, 
      altitud: coordenadas.altitud, 
      idseller: 35,
      image: this.image,
      phone: this.phone
    };
    
    console.log("Soy los datos del negocio", datosNegocio);
  
    this.puesto.agregarPuesto(datosNegocio).pipe(tap({
      next: (response) => {
        alert("Datos de negocio publicados con éxito");
        console.log(response);
      },
      error: (err) => {
        alert("Error con la API: " + err.message);
        console.error('Error creando el negocio', err);
      }
    })).subscribe();
  }
  
}
