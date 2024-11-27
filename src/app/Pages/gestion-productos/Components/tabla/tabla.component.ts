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
  answer: boolean = false;
  asking: boolean = false;
  message: string = '¿Estas seguro de eliminar este producto?';
  title: string = 'Eliminar producto';
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  messageSuccess: string = '';
  messageError: string = '';
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
    this.asking = true;
    this.idProduct = Number(id);
               
  }
  receiveAnswer(answer: boolean){
    this.answer = answer;
    this.isLoading = true;
    if(this.answer){
      this.productService.deletedProduct(this.idProduct).pipe(tap({
        next: (response) => {
          if(response){
            console.log('Producto eliminado con éxito');
            this.messageSuccess = 'Producto eliminado con éxito';
            this.isSuccess = true;
            this.isLoading = false;
            
          }
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error al eliminar el producto', err);
          this.messageError = 'Error al eliminar el producto';
          this.isError = true;
          this.isLoading = false;
          
        }
      })).subscribe()
    }
    if(!this.answer){
      this.asking = false;
      this.message = '¿Estas seguro de eliminar este producto?';
      this.title = 'Eliminar producto';
      this.isSuccess = false;
      this.isLoading = false;
      this.messageSuccess = '';
      this.enviarProduct = {
        idProduct: 0,
        indexProduct: 0,
        arrayProduct: [], 
        updateOrNot: false
      };
      this.modal = false;
    }
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

