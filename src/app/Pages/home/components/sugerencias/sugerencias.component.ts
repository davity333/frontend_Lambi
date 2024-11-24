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
    this.stands = data
    console.log(this.stands)
  });
  }

  items = [
    { img: 'https://via.placeholder.com/150', name: 'Prem Shahi', description: 'Web Developer' },
    { img: 'https://via.placeholder.com/150', name: 'Deepa Chand', description: 'App Developer' },
    { img: 'https://via.placeholder.com/150', name: 'Praka Shahi', description: 'Photographer' },
    { img: 'https://via.placeholder.com/150', name: 'Nina Patel', description: 'Graphic Designer' },
    { img: 'https://via.placeholder.com/150', name: 'Ravi Kumar', description: 'SEO Specialist' },
    { img: 'https://via.placeholder.com/150', name: 'Sara Khan', description: 'Content Writer' }
  ];

  currentSlide = 0;
  itemsPerView = 3; // Number of items visible at a time

  next() {
    if (this.currentSlide < this.items.length - this.itemsPerView) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to the start
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.items.length - this.itemsPerView; // Loop back to the end
    }
  }
}
