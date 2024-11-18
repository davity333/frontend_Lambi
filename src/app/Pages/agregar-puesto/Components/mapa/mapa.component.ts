import { Component } from '@angular/core';
import { createSellerUsersService } from '../../../Auth/users.service';
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
  constructor(private user: createSellerUsersService, private puestoService: PuestoService){}

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
      let latitudString = this.latitude;
      let longitudString = this.longitude;
      this.user.setCoordernadas(latitudString, longitudString);
      console.log("Coordenadas guardadas en el servicio.");
    } else {
      alert("No se han seleccionado las coordenadas");
      console.log("No se han seleccionado coordenadas aún.");
    }
  }

  fotos: File[] = [];
  fotosSeleccionadas: number = 0;
  fotosPreview: string[] = []; 
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        this.puestoService.addFoto(file); 
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          this.fotosPreview.push(result);
        };
        reader.readAsDataURL(file); 
      }
      
      this.fotos = this.puestoService.getFotos();
      this.fotosSeleccionadas = this.fotos.length;
    }
  }
  
  removeImage(image: string): void {
    this.fotosPreview = this.fotosPreview.filter(img => img !== image);
    

    const fotosActualizadas = this.fotos.filter((img) => img.name !== image);
    this.puestoService.setFotos(fotosActualizadas);
  
    this.fotos = fotosActualizadas;
    this.fotosSeleccionadas = this.fotos.length;

  }
  
  
  
}

