import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../busqueda/services/category.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})


export class SugerenciasComponent implements OnInit {
  isLoading = true;
  stands: any[] = [];
  constructor(private categoryService: CategoryService){}
  ngOnInit(): void {

  this.categoryService.getStands().pipe(tap({
    next: (response) => {
      console.log('Estandar:', response);
      // TODO: Implement your logic here to display the stands.
      this.isLoading = false;
    },
    error: (response) => {
      console.log('Error soy:', response);

      this.isLoading = false;
    }
  })).subscribe(data => {
    this.stands = data.filter((item: any) => item.rating >= 4);
    console.log("los puestos con mas de 4 estrellas",this.stands)
  });
  }


  currentSlide = 0;
  itemsPerView = 2.2; // Number of items visible at a time

  next() {
    // Avanza al siguiente grupo de elementos
    if (this.currentSlide < Math.floor(this.stands.length / this.itemsPerView)) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Vuelve al primer grupo cuando llegue al final
    }
  }

  prev() {
    // Retrocede al grupo anterior de elementos
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = Math.floor(this.stands.length / this.itemsPerView); // Va al último grupo
    }
  }

  // Función para obtener los elementos actuales visibles en el carrusel
  get visibleStands() {
    const start = this.currentSlide * this.itemsPerView;
    const end = start + this.itemsPerView;
    return this.stands.slice(start, end); // Devuelve los elementos del grupo actual
  }
  
}
