  import { Component,OnInit } from '@angular/core';
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
    categoryToSearch : FormGroup;
    stand: any;
    constructor(private categoryService: CategoryService){
      this.categoryToSearch = new FormGroup({
        idcategory: new FormControl(''),
        category : new FormControl(''),
      });
    }
    categories : Category[] = [];
    ngOnInit() {
      this.getUserLocation();
      this.categoryService.getAllCategories().pipe(tap({
        next: (response) => {
        },
        error: (response) => {
          alert("Ha habido un error en la pagina")
        }
      }
      ))
      .subscribe( data => {
        this.categories = data
        console.log(data);
      }
      )
    }
    searchStands(){
      let idCategory = this.categoryToSearch.value.idcategory
      if(idCategory != "") {
        this.categoryService.searchStandByCategory(idCategory).pipe(
          tap({
            next: (response) => {
              console.log(response);
            },
            error: (response) => {
              alert("Ha habido un error en la busqueda")
            }
          })
        ).subscribe( data => {
          if(data === false) {
            alert("No hay estandaras en esta categoria")
          }
          this.stand = data;
          console.log(this.stand);
          
        }
        )
      }
      else {
        let categoryname = this.categoryToSearch.value.category;
        let idseconCategory = null;
        this.categories.forEach(element => {
          if(element.category === categoryname){
            idseconCategory = element.idcategory;
          }
        });
        if(idseconCategory != null) {
          this.categoryService.searchStandByCategory(idseconCategory).pipe(
            tap({
              next: (response) => {
                console.log(response);
              },
              error: (response) => {
                alert("Ha habido un error en la busqueda")
              }
            })
          ).subscribe( data => {
            if(data === false) {
              alert("No hay estandaras en esta categoria")
            }
            this.stand = data;
            console.log(this.stand);
            
          }
          )
        }
      }
   }
   goToLocation() {
    const latitude = "16.615491448112827";
    const longitude = "-93.08950717304513";
  
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
 
    window.open(url, '_blank');
  }
  userLatitude: number | null = null;
  userLongitude: number | null = null;

  // Arreglo de coordenadas predefinidas
  coordinates = [
    { name: 'Lugar 1', latitude: 16.6272, longitude: -93.1005 },
    { name: 'Lugar 2', latitude: 16.6162, longitude: -93.1101 },
    { name: 'Lugar 3', latitude: 16.6400, longitude: -93.1200 },
    // Agrega más lugares aquí
  ];

  closestLocations: any[] = [];


  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        
        // Calcula los puntos más cercanos
        this.calculateClosestLocations();
      });
    } else {
      alert("La Geolocalización no está soportada por este navegador.");
    }
  }

  // Calcula la distancia entre dos puntos con la fórmula de Haversine
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  calculateClosestLocations() {
    if (this.userLatitude !== null && this.userLongitude !== null) {
      this.closestLocations = this.coordinates
        .map(location => ({
          ...location,
          distance: this.getDistance(this.userLatitude!, this.userLongitude!, location.latitude, location.longitude)
        }))
        .sort((a, b) => a.distance - b.distance); // Ordena por distancia ascendente
    }
  }
  
  }
