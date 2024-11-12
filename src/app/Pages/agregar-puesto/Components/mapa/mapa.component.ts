import { Component } from '@angular/core';
import { UsersService } from '../../../Auth/users.service';
import { log } from 'console';

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
  constructor(private user: UsersService){}

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
  
}

