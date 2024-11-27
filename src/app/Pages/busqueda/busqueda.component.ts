
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { Category } from './models/category';
import { map, tap } from 'rxjs';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Puesto } from '../agregar-puesto/Models/estados';
import { Router } from '@angular/router';

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
  negocios: Puesto[]=[];
  idbuyer:number = 0
  isLoading = true;
  noStands = false;
  message = "No hay stands que coincidan con tu búsqueda";
  constructor(private categoryService: CategoryService, private route: Router) {
    this.categoryToSearch = new FormGroup({
      idcategory: new FormControl(''),
      category: new FormControl(''),
    });
  }

  categories: Category[] = [];
  initSearchStands(idbuyer:number,palabra:string){
    localStorage.removeItem('search');
    this.categoryService.searchStandByName(palabra,idbuyer).pipe(
      tap({
        next: (response) => {
          console.log(response);
        },
        error: (response) => {
          console.log(response);
        }
      })
    ).subscribe(data=>{
      this.stand = data;
      if(this.stand.length > 0){
        this.calculateClosestLocations();
      }
      else{
        this.isLoading = false;
        this.noStands = true;
      }
      

    })
  }
  ngOnInit() {
    const Idbuyer = localStorage.getItem('buyer');
    this.idbuyer = Idbuyer ? JSON.parse(Idbuyer).idbuyer : null;
    const palabra = localStorage.getItem('search');
    this.getUserLocation();
    if(palabra !== null){
      this.initSearchStands(this.idbuyer,palabra);
    }
    else{
      this.categoryService.getStands().pipe(
        tap({
          next: (response) => {
            this.isLoading = false;
          },
          error: (response) => {
            this.isLoading = false;
          }
        })
      ).subscribe(data => {
       this.stand = data;
       this.calculateClosestLocations();
      
      });
    }
      this.isLoading = true;
      this.categoryService.getAllCategories().pipe(tap({
        next: (response) => {
          this.isLoading = false;
        },
        error: (response) => {
          this.isLoading = false;
        }
      })
    ).subscribe(data => {
      this.categories = data;
      console.log(data);
    });
    this.isLoading = false;
  }

  searchStands() {
    let idCategory = this.categoryToSearch.value.idcategory;
    if (idCategory !== "") {
      this.categoryService.searchStandByCategory(idCategory,this.idbuyer).pipe(
        tap({
          next: (response) => {
            console.log(response);
            this.isLoading = false;
          },
          error: (response) => {
            this.isLoading = false;
          }
        })
      ).subscribe(data => {
        if (data === false) {
          this.noStands = true;
          this.message = "No hay stands que coincidan con tu búsqueda";
        }
        this.stand = data; 
        console.log(this.stand);
        
        this.calculateClosestLocations(); 
      });
    }
    else {
      let namePuesto = this.categoryToSearch.value.category;
      this.categoryService.searchStandByName(namePuesto,this.idbuyer).pipe(tap({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
        },
        error: (response) => {
          this.isLoading = false;
        }
      })).subscribe(
        data => {
        if (data === false) {
          this.noStands = true;
          this.message = "No hay stands que coincidan con tu búsqueda";
        }
        this.stand = data; 
        console.log(this.stand);
        
        this.calculateClosestLocations();
      }
      )
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("User location obtained:", position);
        this.userLatitude = position.coords.latitude;
        this.userLongitude = position.coords.longitude;
        this.calculateClosestLocations();
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      this.message = "La Geolocalización no está soportada por este navegador.";
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
        distance: this.getDistance(this.userLatitude!, this.userLongitude!, location.latitud, location.altitud) // Usa altitud como longitud
      }))
      .sort((a, b) => a.distance - b.distance);
    }
  }
  receiveIdStand($event: any){
    localStorage.setItem('standId', $event)
    this.route.navigate(['/viewstand']);
    
  }
}
