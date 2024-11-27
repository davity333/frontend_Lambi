import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PuestoService } from '../../Services/puesto.service';
import { createSellerUsersService } from '../../../Auth/users.service';
import { Categoria, Estados } from '../../Models/estados';
import { tap, forkJoin } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
  idStand: number = 0;
  isLoading: boolean = false;
  edit: number = 0; 
  imagesToShow = [""]
  municipio = [
    { nombre: "Tuxtla Gutiérrez" }, { nombre: "Suchiapa" }, { nombre: "San Cristóbal de las Casas" }
  ];
  estadosChiapas = [
    { nombre: "Chiapas"}
  ]

  constructor(private puesto: PuestoService, private user: createSellerUsersService, private cdRef: ChangeDetectorRef, private router: Router, private location: Location) {
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
    this.estadosChiapas = [
      { nombre: "Chiapas" }
    ];
    this.municipio = [
      { nombre: "Tuxtla Gutiérrez" }, { nombre: "Suchiapa" }, { nombre: "San Cristóbal de las Casas" }
    ];
    this.puesto.getCategorias().pipe(tap(
      {
        next: (response) => { 
           this.categorias = response;
      },
      error: (err) => {
       console.error('Error al cargar datos iniciales', err)
      }
    }
    )).subscribe()
    const traer = localStorage.getItem("edit"); 
    if (traer) {
      this.edit = JSON.parse(traer); 
      if (this.edit === 1) {
        const storedStand = localStorage.getItem('standId');
        this.idStand = storedStand ? JSON.parse(storedStand) : null;

        const storedSeller = localStorage.getItem('seller');
        this.idSeller = storedSeller ? JSON.parse(storedSeller).idseller : null;

        if (this.idStand > 0) {
          forkJoin({
            categorias: this.puesto.getCategorias(),
            puesto: this.puesto.getPuesto(this.idStand)
          }).pipe(
            tap(({ categorias, puesto }) => {
              // Cargar categorías
              this.categorias = categorias;

              // Encontrar estado y municipio seleccionados
              const estadoSeleccionado = this.estadosChiapas.find(e => e.nombre === puesto.estado);
              const municipioSeleccionado = this.municipio.find(m => m.nombre === puesto.municipio);

              this.datos.patchValue({
                name: puesto.name,
                description: puesto.description,
                street: puesto.street,
                no_house: puesto.no_house,
                colonia: puesto.colonia,
                category: puesto.idcategory,
                municipio: municipioSeleccionado ? municipioSeleccionado.nombre : '',
                estado: estadoSeleccionado ? estadoSeleccionado.nombre : 'Chiapas',
                phone: puesto.phone,
                horario: puesto.horario,
                send_to_house: puesto.send_to_house === 1 ? true : null,
              });

              // Guardar imágenes iniciales
              this.imagesToShow = puesto.image;

              // Depuración
              console.log('Formulario actualizado con puesto:', puesto);
              console.log('Estados disponibles:', this.estadosChiapas);
              console.log('Categorías disponibles:', this.categorias);
            })
          ).subscribe({
            next: () => console.log('Datos iniciales cargados.'),
            error: (err) => console.error('Error al cargar datos iniciales', err),
          });
        }
      }
    }
  }
  actualizarPuesto(){
    let standUpdate ={
      name: this.datos.value.name,
      description: this.datos.value.description,
      street: this.datos.value.street,
      no_house: this.datos.value.no_house,
      colonia: this.datos.value.colonia, 
      image: this.imagesToShow, 
      category: this.datos.value.category, 
      municipio: this.datos.value.municipio,
      estado: this.datos.value.estado,
      phone: this.datos.value.phone,
      send_to_house: this.datos.value.send_to_house === true? 1 : 0,
      idseller: this.idSeller,
    }

    this.puesto.updatePuesto(this.idStand, standUpdate).pipe(tap(
      {
      next: (response) => {
        console.log("actualizado el puesto",response);
        this.mensajeAlerta = 'Puesto actualizado correctamente.';
        this.alertaConfirmation = true;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar el puesto', err);
        this.mensajeAlerta = 'Error al actualizar el puesto.';
        this.alertaNegation = true;
        this.cdRef.detectChanges();
      }
  })).subscribe();
  this.imageFiles = this.puesto.getFotos()
     if(this.imageFiles){ 
      let formImages = new FormData(); 
      this.imageFiles.forEach(file => {
        formImages.append('image', file, file.name); 
      });
      this.puesto.updateImagesStand(this.idStand, formImages).pipe(tap({
        next: (response) => {
          console.log("actualizado las imagenes del puesto",response);
        },
        error: (err) => {
          console.error('Error al actualizar las imagenes del puesto', err);
          this.mensajeAlerta = 'Error al actualizar las imagenes del puesto.';
          this.alertaNegation = true;
          this.cdRef.detectChanges();
        }
      })).subscribe();
     }
     setTimeout(() => {
      console.log('Redirigiendo a /viewStand...');
      this.router.navigate(['/viewstand']);
    }, 3000);
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

    this.isLoading = true;
    this.puesto.agregarPuesto(formData).subscribe({
      next: (response) => {
        this.mensajeAlerta = 'Negocio publicado con éxito';
        this.alertaConfirmation = true;
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: (err) => {
        alert('Error con la API: ' + err.message);
        this.isLoading = false;
      }
    });
    }else{
      this.mensajeAlerta = 'Por favor, complete todos los campos.';
      this.alertaNegation = true;
      return;
    }
    
  }
  regresar(){
   this.location.back()
  }
  deleteImage($event: string[]){
    this.imagesToShow= $event;
  }
  obtenerIdCategoria(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.categorias.find(category => category.idcategory === +selectedCategoryId);
    this.idCategoria = selectedCategoryId;

    if (selectedCategory) {
        alert(`Seleccionaste la categoría con ID: ${selectedCategoryId} y nombre: ${selectedCategory.category}`);
    }
  }
  showError(fieldName: string): boolean {
    const control = this.datos.get(fieldName);
    return !!control?.invalid && (control.touched || this.datos.touched || this.datos.dirty);
  }
}
