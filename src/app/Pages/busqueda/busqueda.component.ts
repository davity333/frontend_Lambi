
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { map, tap } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  categoryToSearch: FormGroup;
  stand: any[] = []; // Array para almacenar los stands obtenidos
  userLatitude: number | null = null;
  userLongitude: number | null = null;
  closestLocations: any[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryToSearch = new FormGroup({
      idcategory: new FormControl(''),
      category: new FormControl(''),
    });
  }

  categories: Category[] = [];

  ngOnInit() {
    this.getUserLocation();
    this.categoryService.getAllCategories().pipe(
      tap({
        next: (response) => {},
        error: (response) => {
          alert("Ha habido un error en la página");
        }
      })
    ).subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  searchStands() {
    let idCategory = this.categoryToSearch.value.idcategory;
    if (idCategory !== "") {
      this.categoryService.searchStandByCategory(idCategory).pipe(
        tap({
          next: (response) => {
            console.log(response);
          },
          error: (response) => {
            alert("Ha habido un error en la búsqueda");
          }
        })
      ).subscribe(data => {
        if (data === false) {
          alert("No hay stands en esta categoría");
        }
        this.stand = data; // Guardamos los stands en el arreglo
        console.log(this.stand);
        this.calculateClosestLocations(); // Llamamos la función para calcular las ubicaciones cercanas
      });
    }
    // Código para la búsqueda por nombre de categoría omitido por brevedad
  }

  goToLocation(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.calculateClosestLocations();
      });
    } else {
      alert("La Geolocalización no está soportada por este navegador.");
    }
  }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  calculateClosestLocations() {
    if (this.userLatitude !== null && this.userLongitude !== null && this.stand.length > 0) {
      this.closestLocations = this.stand
        .map(location => ({
          ...location,
          distance: this.getDistance(this.userLatitude!, this.userLongitude!, location.altitud, location.longitud)
        }))
        .sort((a, b) => a.distance - b.distance);
    }
  }
}
