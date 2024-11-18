import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';
import { Product } from '../../../gestion-productos/Models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productstand',
  templateUrl: './productstand.component.html',
  styleUrl: './productstand.component.css',
  providers: [CurrencyPipe]  // Aquí lo agregas
})
export class ProductstandComponent implements OnInit {
  @Input() standid: number=0;
  products:Product[]=[];
  cantidadInput:number=0;
  idStand:number=0;
  idBuyer:number=0;
  ventanaModal:boolean=true;
  constructor(private standByClientService:StandByClientService, private currencyPipe: CurrencyPipe) { }

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
  
  agregarMas(index: number): void {
    const producto = this.products[index];
    const sells = {
      idproduct: producto.idproduct, 
      idStand: localStorage.getItem('standId') 
    };
  
    console.log('Objeto sells:', sells); 
    this.cantidadInput++; 
  }


  agregarMenos(index: number): void {

  }

  abrirModal(index: number): void {
    this.ventanaModal=true;
    localStorage.setItem('productId', String(index));
    console.log("ProductID",localStorage.getItem('productId'), "StandID",localStorage.getItem('standId'))
  }

  cerrarModal($event : any){
      this.ventanaModal = $event;
  }

}
