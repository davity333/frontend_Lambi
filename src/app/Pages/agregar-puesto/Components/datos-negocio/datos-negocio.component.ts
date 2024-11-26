import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PuestoService } from '../../Services/puesto.service';
import { createSellerUsersService } from '../../../Auth/users.service';
import { Categoria, Estados } from '../../Models/estados';
import { tap } from 'rxjs';

@Component({
  selector: 'app-datos-negocio',
  templateUrl: './datos-negocio.component.html',
  styleUrls: ['./datos-negocio.component.css']
})
export class DatosNegocioComponent implements OnInit {

  datos: FormGroup;
  estados: Estados[] = [];
  phone: string[] = [];
  idSeller = "";
  imageFiles: File[] = [];
  latitud: string = "";
  altitud: string = "";
  categorias: Categoria[] = [];
  idCategoria: number = 0;
  servicioDomicilio: boolean | null = null;
  mensajeAlerta: string = "";
  alertaConfirmation: boolean = false;
  alertaNegation: boolean = false;
  imagenesData:string[] = [];

  municipio = [
    { nombre: "Tuxtla" }, { nombre: "Suchiapa" }, { nombre: "San Cristóbal de las Casas" }
  ];

  constructor(private puesto: PuestoService, private user: createSellerUsersService, private cdRef: ChangeDetectorRef) {
    this.datos = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      no_house: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      send_to_house: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const storedSeller = localStorage.getItem('seller');
    this.idSeller = storedSeller ? JSON.parse(storedSeller).idseller : null;
    alert(this.idSeller);
    this.puesto.getEstados().subscribe(
      (data) => {
        this.estados = data;
        console.log(this.estados);
      }
    );

    this.puesto.getCategorias().pipe(tap({
      next: (response) => {
        console.log(response);
        this.categorias = response;
      },
      error: (err) => {
        console.error('Error al obtener las categorias', err);
      }
    })).subscribe();
  }

  publicar(): void {
    const formData = new FormData();
    this.imageFiles = this.puesto.getFotos();

    if(this.datos.valid){
      
    
    if (this.imageFiles.length === 0) {
      this.mensajeAlerta = 'Por favor, selecciona al menos una imagen.';
      this.alertaNegation = true;
      return;
    }

    formData.append('name', this.datos.get('name')?.value);
    formData.append('description', this.datos.get('description')?.value);
    formData.append('category', this.datos.get('category')?.value);
    formData.append('municipio', this.datos.get('municipio')?.value);
    formData.append('colonia', this.datos.get('colonia')?.value);
    formData.append('street', this.datos.get('street')?.value);
    formData.append('no_house', this.datos.get('no_house')?.value);
    formData.append('estado', this.datos.get('estado')?.value);
    formData.append('horario', this.datos.get('horario')?.value);
    if(this.datos.get('send_to_house')?.value == 'true'){
      formData.append('send_to_house', 'true');
    }else{
      formData.append('send_to_house', 'false');
    }
    formData.append('idseller', this.idSeller);
    this.imageFiles.forEach(file => {
      formData.append('image', file, file.name); 
    });

    const latitud = this.user.getCoordernadas().latitud;
    const altitud = this.user.getCoordernadas().altitud;
    if (!isNaN(latitud)) {
      formData.append('latitud', latitud.toString());
    }
    if (!isNaN(altitud)) {
      formData.append('altitud', altitud.toString());
    }
    console.log("el arreglo a mandar es "+this.datos.value);
    const phones: string[] = Array.isArray(this.datos.value.phone) ? this.datos.value.phone : [this.datos.value.phone];
    phones.forEach(phone => {
      formData.append('phone', phone);
    });
    this.puesto.agregarPuesto(formData).subscribe({
      next: (response) => {
        this.mensajeAlerta = 'Negocio publicado con éxito';
        this.alertaConfirmation = true;
      },
      error: (err) => {
        alert('Error con la API: ' + err.message);
      }
    });
    }else{
      this.mensajeAlerta = 'Por favor, complete todos los campos.';
      this.alertaNegation = true;
      return;
    }
    
  }
  
  obtenerIdCategoria(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.categorias.find(category => category.idcategory === +selectedCategoryId);
    this.idCategoria = selectedCategoryId;

    if (selectedCategory) {
        alert(`Seleccionaste la categoría con ID: ${selectedCategoryId} y nombre: ${selectedCategory.category}`);
    }
  }

}
