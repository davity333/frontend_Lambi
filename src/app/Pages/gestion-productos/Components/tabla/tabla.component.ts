import { Component } from '@angular/core';
import { OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { tap } from 'rxjs';
import { Productos } from '../../Models/product';
import { stringify } from 'querystring';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  @Output() enviarId = new EventEmitter<string>();
  @Output() enviarProducts = new EventEmitter<any[]>();
  products: Productos[] = [];
  indexProduct: number = 0;
  idProduct: number = 0;

  constructor(private productService:ProductsService) { }
  ngOnInit(): void {
    const idStand = Number(localStorage.getItem('standId'));

    this.productService.getProductId(idStand).pipe(tap({
      next: (response) => {
        console.log("los productos del usuario es",response);
        this.products = response;
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
      }
    })).subscribe();

    
  }

  actualizar(index: number, id: number): void {
    this.indexProduct = Number(index);
    this.idProduct = Number(id);

  localStorage.setItem('productId',  this.idProduct.toString())
  localStorage.setItem('indexProduct', this.indexProduct.toString());
  alert("Actualizar en el producto: " + this.indexProduct);
  
  this.enviarProducts.emit(this.products);
  }

  eliminar(id: number){
        this.indexProduct = Number(id);

        this.productService.deletedProduct(this.indexProduct).pipe(tap({
          next: (response) => {
            console.log('Producto eliminado con éxito');
            this.ngOnInit();
          },
          error: (err) => {
            console.error('Error al eliminar el producto', err);
          }
        })).subscribe()
  }
  
}
