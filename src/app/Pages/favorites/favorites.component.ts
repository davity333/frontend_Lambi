import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  palabraInput: string='';
  textoBuscador: string='';

  buscar(){
    this.textoBuscador = this.palabraInput;
  }

  favoritos = [
    {
      name: "MetalClotes", municipio:"suchiapa", distance:"33", category:'1'
    },
    {
      name: "Comiditas somer", municipio:"suchiapa", distance:"33", category:'1'
    },
    {
      name: "Dahomey la bailarina", municipio:"suchiapa", distance:"33", category:'1'
    },
    {
      name: "ChuyCode", municipio:"suchiapa", distance:"33", category:'1'
    },
  ]

}
