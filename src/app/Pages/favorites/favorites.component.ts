import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  favoritos = [
    {
      nombre: "MetalClotes", categoria:"Ropa", duenio:"MetalVit", img:'/assets/ejemplo.jpeg'
    },
    {
      nombre: "Comiditas somer", categoria:"comidas", duenio:"Somer", img:'/assets/ejemplo.jpeg'
    },
    {
      nombre: "Dahomey la bailarina", categoria:"Servicio", duenio:"Dahomey", img:'/assets/dahomeyBailarina.jpeg'
    },
    {
      nombre: "ChuyCode", categoria:"Servicio", duenio:"Jesus Imanol", img:'/assets/ejemplo.jpeg'
    },
  ]

}
