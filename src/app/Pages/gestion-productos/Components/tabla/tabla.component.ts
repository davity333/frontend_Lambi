import { Component } from '@angular/core';
import { OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { tap } from 'rxjs';
import { Product } from '../../Models/product';
import { stringify } from 'querystring';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  @Output() enviarId = new EventEmitter<string>();
  @Output() enviarProducts = new EventEmitter<Product[]>();
  products: Product[] = [];

  product: Product[] = [];
  indexProduct: number = 0;
  idProduct: number = 0;
  emitirProducts(){
    this.enviarProducts.emit(this.products);
  }
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
  @Output() actualizarProducto = new EventEmitter<{index: number, id: number}>
  actualizar(index: number, id: number): void {
    this.actualizarProducto.emit({index: this.indexProduct, id: this.idProduct});
    this.indexProduct = Number(index);
    this.idProduct = Number(id);
  this.actualizarProducto.emit({index: this.indexProduct, id: this.idProduct});
  alert("Actualizar en el producto: " + this.indexProduct);
  this.enviarProducts.emit(this.products);
  }

  eliminar(id: number){
        this.indexProduct = Number(id);

        this.productService.deletedProduct(this.indexProduct).pipe(tap({
          next: (response) => {
            if(response){
              console.log('Producto eliminado con éxito');
            }else{
              console.log('Este producto no existe');
            }
            this.ngOnInit();
          },
          error: (err) => {
            console.error('Error al eliminar el producto', err);
          }
        })).subscribe()
  }

}

