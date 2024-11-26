import { Component } from '@angular/core';
import { OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { tap } from 'rxjs';
import { EnviarProducto, Product } from '../../Models/product';
import { stringify } from 'querystring';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  @Output() enviarId = new EventEmitter<string>();
  enviarProduct : EnviarProducto = {
    idProduct: 0,
    indexProduct: 0,
    arrayProduct: [], 
    updateOrNot: false
  }
  products: Product[] = [];
  product: Product[] = [];
  indexProduct: number = 0;
  idProduct: number = 0;
  modal:boolean = false;
  updateOrNot: boolean = false; 

  constructor(private productService:ProductsService, private router: Router) { }

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
    this.enviarProduct = {
      idProduct : this.idProduct,
      indexProduct : this.indexProduct,
      arrayProduct: this.products, 
      updateOrNot: true
    };
    this.modal = true; 
    this.updateOrNot = true;
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
  agregar($event:boolean){
     this.updateOrNot = $event
  }
  closeModal(valor: boolean){
      this.modal = valor;
  }
  putArray($event: Product[]){
   this.products = $event; 
  }
  openModal(){
    this.modal = true;
  }
  goToHome(){
    this.router.navigate(['/viewstand']);
  }
  addToArray($event: Product){
    this.products.push($event);
  }
}

