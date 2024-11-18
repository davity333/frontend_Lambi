import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { OnInit } from '@angular/core';
import { ProductsService } from '../../../gestion-productos/service/products.service';
import { tap } from 'rxjs';
import { Product, ProductCarr } from '../../../gestion-productos/Models/product';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  ventanaModalCerrada: boolean = false; 
  @Output() modal = new EventEmitter<boolean>();

  constructor(private stand:StandByClientService, private product: ProductsService){}
  idProduct:number = 0;
  idStand:number = 0;
  productCarr: Product | null = null;

  cerrar() {
    this.modal.emit(this.ventanaModalCerrada); 
  }

  ngOnInit(): void {
    const storedProductId = localStorage.getItem('productId');
    const storedStandId = localStorage.getItem('standId');
  
    if (storedProductId && storedStandId) {
      this.idProduct = Number(storedProductId);
      this.idStand = Number(storedStandId);

      this.product.getProductId(this.idProduct).pipe(tap({
        next: (response) => {
          console.log('Producto: ', response);
          this.productCarr = response;
        },
        error: (error) => {
          console.error('Error al obtener el producto: ', error);
        } 
      })).subscribe()

    } else {
      this.idProduct = 0;  
      this.idStand = 0;    
    }
}

}
