import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-gestion-puesto',
  templateUrl: './gestion-puesto.component.html',
  styleUrl: './gestion-puesto.component.css'
})

export class GestionPuestoComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 51.678418, lng: 7.809007 };  // Coordenadas iniciales (puedes dejarlo como base)
  zoom = 8;
  
  // Variables para almacenar latitud y longitud
  latitude: number | null = null;
  longitude: number | null = null;

  ngOnInit(): void {
    this.obtenerUbicacion();
  }

  // Función para obtener la ubicación actual
  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.center = { lat, lng }; // Actualiza las coordenadas del centro del mapa
          this.zoom = 15; // Ajusta el zoom para ver bien la ubicación
          console.log(`Ubicación obtenida: Lat: ${lat}, Lng: ${lng}`);
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
          // En caso de error, se puede mantener la ubicación por defecto
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
      console.log(`Coordenadas: Lat: ${this.latitude}, Lng: ${this.longitude}`);
    }
  }

  guardarCoordenadas() {
    console.log(`Latitud: ${this.latitude}, Longitud: ${this.longitude}`);
  }
}
