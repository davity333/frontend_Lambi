import { Component } from '@angular/core';
import { UsersService } from '../../../Auth/users.service';
import { PuestoService } from '../../Services/puesto.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  center: google.maps.LatLngLiteral = { lat: 51.678418, lng: 7.809007 };  
  zoom = 8;

  latitude: number | null = null;
  longitude: number | null = null;

  ngOnInit(): void {
    this.obtenerUbicacion();
  }
  constructor(private user: UsersService, private puestoService: PuestoService){}

  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.center = { lat, lng }; 
          this.latitude = lat; 
          this.longitude = lng; 
          this.zoom = 15; 
          console.log(`Ubicación obtenida: Lat: ${lat}, Lng: ${lng}`);

        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
        }
      );
    } else {
      console.log("Geolocalización no es soportada por este navegador.");
    }
  }


  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();  
      this.longitude = event.latLng.lng(); 
      console.log(`Coordenadas seleccionadas: Lat: ${this.latitude}, Lng: ${this.longitude}`);
    }
  }


  guardarCoordenadas(event: Event) {
    event.preventDefault(); 
    alert("Se guardaron las coordenadas");
    
    if (this.latitude !== null && this.longitude !== null) {
      let latitudString = this.latitude.toString();
      let longitudString = this.longitude.toString();
      this.user.setCoordernadas(latitudString, longitudString);
      console.log("Coordenadas guardadas en el servicio.");
    } else {
      alert("No se han seleccionado las coordenadas");
      console.log("No se han seleccionado coordenadas aún.");
    }
  }

  /*ALMCENAR FOTOS */
  fotos:string[] =[];
  fotosSeleccionadas:number=0
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {

      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const result = e.target?.result as string;
          this.fotos.push(result);
        };

        reader.readAsDataURL(file);  // Leer el archivo como Data URL
        console.log("Imágenes seleccionadas:", this.fotos);
        this.fotosSeleccionadas++;
        this.puestoService.setFotos(this.fotos);
      }
    }
  }

  removeImage(image: string) { 
    if (this.fotosSeleccionadas === 0) {
      this.fotosSeleccionadas = 0;
    }else{
      this.fotos = this.fotos.filter(img => img !== image);
      this.fotosSeleccionadas = this.fotosSeleccionadas -1;
      this.puestoService.setFotos(this.fotos);
    }
  }
  
}

