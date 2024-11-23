import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../busqueda/services/category.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-services-stands',
  templateUrl: './services-stands.component.html',
  styleUrl: './services-stands.component.css'
})
export class ServicesStandsComponent implements OnInit {
  idbuyer: number = 0;
  isError: boolean = false;
  standsService: any[] = [];
  userLatitude: number | null = null;
  userLongitude: number | null = null;
  closestLocations: any[] = [];
  constructor(private router: Router, private categoryService: CategoryService  ) {
   }
  ngOnInit(): void {
    
    const Idbuyer = localStorage.getItem('buyer');
    this.idbuyer = Idbuyer ? JSON.parse(Idbuyer).idbuyer : null;
    this.categoryService.searchStandByCategory(4, this.idbuyer).pipe(tap({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        this.isError = true;
      }
    })).subscribe(
      data => {
        this.standsService = data;

        if(this.standsService.length > 0){
        }
        else{
          alert("No hay estandares en este rubro.");
        }
        this.calculateClosestLocations();
        this.getUserLocation();
      }
    );
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
    if (this.userLatitude !== null && this.userLongitude !== null && this.standsService.length > 0) {
      this.closestLocations = this.standsService
      .map(location => ({
        ...location,
        distance: this.getDistance(this.userLatitude!, this.userLongitude!, location.latitud, location.altitud) // Usa altitud como longitud
      }))
      .sort((a, b) => a.distance - b.distance);
    }
  }
  receiveIdStand($event: any){
    localStorage.setItem('standId', $event)
    this.router.navigate(['/viewstand']);
    
  }
}
