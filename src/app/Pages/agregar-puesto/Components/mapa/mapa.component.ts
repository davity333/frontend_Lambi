import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent {
  center: google.maps.LatLngLiteral = { lat: 51.678418, lng: 7.809007 };  // Coordenadas iniciales
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
          this.latitude = lat; // Almacena la latitud
          this.longitude = lng; // Almacena la longitud
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

  // Función para manejar clic en el mapa
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();  // Guarda la latitud
      this.longitude = event.latLng.lng(); // Guarda la longitud
      console.log(`Coordenadas seleccionadas: Lat: ${this.latitude}, Lng: ${this.longitude}`);
    }
  }

  // Función para guardar las coordenadas
  guardarCoordenadas() {
    if (this.latitude !== null && this.longitude !== null) {
      console.log(`Coordenadas guardadas: Lat: ${this.latitude}, Lng: ${this.longitude}`);
      // Aquí puedes almacenar las coordenadas donde las necesites
    } else {
      alert("No se a seleccionado las coordenadas")
      console.log("No se han seleccionado coordenadas aún.");
    }
  }
}
