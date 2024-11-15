import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { PuestoService } from '../../Services/puesto.service';
import { Categoria } from '../../Models/estados';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() stand:any;
  categories : Categoria[] = [];
  categori = ""
  
  constructor(readonly puestoService : PuestoService) { }
  ngOnInit() {
    this.puestoService.getCategorias().subscribe(res => {
      //comprobare si en categories es idcategory == stand.category
      this.categori = this.stand.category; 
      this.categori = res.filter(cat => cat.idcategory == this.stand.category)[0].category;
      this.categories = res.filter(cat => cat.idcategory == this.stand.category);
      
      console.log("estoy aqui",this.categories);
      this.categories = res;
      
      console.log("estoy aqui",this.categories);
    });
  }


}
