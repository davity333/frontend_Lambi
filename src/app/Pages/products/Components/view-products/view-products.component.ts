import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProductsService } from '../../../gestion-productos/service/products.service';
import { tap } from 'rxjs';
import { Productos } from '../../../gestion-productos/Models/product';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { Categoria } from '../../../agregar-puesto/Models/estados';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent implements OnInit {

  constructor(private productService: ProductsService, private puestoService:PuestoService){}
  products:Productos[]= [];

  ngOnInit():void {
    this.productService.getProducts().pipe(tap({
      next: (response) => {},
      error: (response) => {
        alert("Ha habido un error en cargar los productos");
      }
    })
  ).subscribe(data => {
    this.products = data;
    console.log(data);
  });

  }

}
