import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PuestoService } from '../../Services/puesto.service';
import { UsersService } from '../../../Auth/users.service';
import { Estados } from '../../Models/estados';
import { Input } from '@angular/core';
@Component({
  selector: 'app-datos-negocio',
  templateUrl: './datos-negocio.component.html',
  styleUrls: ['./datos-negocio.component.css']
})
export class DatosNegocioComponent implements OnInit {

  datos: FormGroup;
  estados: Estados[] = [];
  phone: string[] = [];
  idSeller: number = 16;
  image: File[] = [];
  latitud: string = "";
  altitud: string = "";
  
  imagenesData:string[] = [];

  municipio = [
    { nombre: "Tuxtla" }, { nombre: "Suchiapa" }, { nombre: "San Cristóbal de las Casas" }
  ];

  constructor(private puesto: PuestoService, private user: UsersService, private cdRef: ChangeDetectorRef) {
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

  ngOnInit(): void {
    this.puesto.getEstados().subscribe(
      (data) => {
        this.estados = data;
        console.log(this.estados);
      }
    );
    
  }

  // Función para manejar la selección de archivos
  onFilesSelected(event: any) {
    this.image = Array.from(event.target.files); // Convertir el FileList a un arreglo
    console.log("Imágenes seleccionadas:", this.image);  // Verificar que todas las imágenes están siendo seleccionadas
  }

  // Función para enviar los datos del formulario y las imágenes
  publicar() {
    this.imagenesData = this.puesto.getFotos();
    console.log("imagenes al publicar puesto")
    console.log(this.imagenesData)
    const phoneValue = this.datos.get('phone')?.value;
    if (phoneValue) {
      this.phone.push(phoneValue.toString());
    }

    // Obtener las coordenadas del usuario
    const coordenadas = this.user.getCoordernadas();

    const formData = new FormData();
    formData.append('name', this.datos.get('name')?.value);
    formData.append('description', this.datos.get('description')?.value);
    formData.append('category', this.datos.get('category')?.value.toString());
    formData.append('street', this.datos.get('street')?.value);
    formData.append('no_house', this.datos.get('no_house')?.value);
    formData.append('colonia', this.datos.get('colonia')?.value);
    formData.append('municipio', this.datos.get('municipio')?.value);
    formData.append('estado', this.datos.get('estado')?.value);
    formData.append('phone', this.phone.join(','));  // Asegúrate de unir los números de teléfono si hay varios
    formData.append('horario', this.datos.get('horario')?.value);
    formData.append('latitud', coordenadas.latitud);
    formData.append('altitud', coordenadas.altitud);
    formData.append('idseller', this.idSeller.toString());

    this.imagenesData.forEach((image) => {
      formData.append('images', image); // Suponiendo que 'image' es un string con la URL o nombre
    });
    // Enviar el FormData
    this.puesto.agregarPuesto(formData).subscribe({
      
      next: (response) => {
        alert("Datos de negocio publicados con éxito");
        console.log(response);
      },
      error: (err) => {
        alert("Error con la API: " + err.message);
        console.error('Error creando el negocio', err);
        console.log("fotos")
        console.log(this.imagenesData)
      }
    });
  }
  
}