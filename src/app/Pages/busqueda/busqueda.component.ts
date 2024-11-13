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
    const latitude = "16.6272";
    const longitude = "-93.1005";
  
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
 
    window.open(url, '_blank');
  }
  
  }
