import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit, Output } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';
import { Product} from '../../../gestion-productos/Models/product';
import { CurrencyPipe } from '@angular/common';
import { Sell } from '../Models/sell';
import EventEmitter from 'events';
import { ProductsService } from '../../../gestion-productos/service/products.service';
import { Carrito } from '../../../gestion-productos/Models/carrito';
@Component({
  selector: 'app-productstand',
  templateUrl: './productstand.component.html',
  styleUrl: './productstand.component.css',
  providers: [CurrencyPipe]  // Aquí lo agregas
})
export class ProductstandComponent implements OnInit {
  @Input() standid: number=0;
  @Output() sellProduct: EventEmitter<any> = new EventEmitter<any>();
  products:Product[]=[];
  cantidadInput:number=0;
  idStand:number=0;
  idBuyer:number=0;
  ventanaModal:boolean=false;


  constructor(private standByClientService:StandByClientService, private currencyPipe: CurrencyPipe, private product: ProductsService) { }


  ngOnInit(): void {
    // Consumir la API y obtener los productos
    this.standByClientService.getProductsStand(this.standid).pipe(tap({
      next: (products) => {
        console.log('Productos del stand:', products);
        this.products = products.map(product => ({
          ...product,
          cantidadInput: 1 
        }));
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })).subscribe();
  }
  

  abrirModal(object: any): void {
    this.ventanaModal=true;
    
    const productId = localStorage.getItem('productId');
    const standId = localStorage.getItem('standId');
    console.log("ProductID",productId, "StandID",standId)

    const carrito: Carrito = {
      datos: object,
      amountCantidad: 1,
      standId: standId,
      idproduct: object.idproduct,
    };

    console.log("Datos al Carrito:", carrito);
 
      this.product.addCar(carrito);


    
  }

  cerrarModal($event : any){
      this.ventanaModal = $event;
  }

}
