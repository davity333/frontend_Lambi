import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Productos } from '../../../gestion-productos/Models/product';
import { Categoria } from '../../../agregar-puesto/Models/estados';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent implements OnInit{
  @Input() products:any;
  categories : Categoria[] = [];
    categori = ""

    constructor(private puestoService: PuestoService) { }

      ngOnInit(): void {
        this.puestoService.getCategorias().subscribe(res => {
          this.categori = this.products.category; 
          this.categori = res.filter(cat => cat.idcategory == this.products.category)[0].category;
          this.categories = res.filter(cat => cat.idcategory == this.products.category);
          
          console.log("estoy aqui",this.categories);
          this.categories = res;
          
          console.log("estoy aqui",this.categories);
        });
      }

}
