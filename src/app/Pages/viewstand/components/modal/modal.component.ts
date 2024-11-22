import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { OnInit } from '@angular/core';
import { Carrito } from '../../../gestion-productos/Models/carrito';
import { ProductsService } from '../../../gestion-productos/service/products.service';
import { tap } from 'rxjs';
import { Sell } from '../Models/sell';
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
  statusBoton:boolean = false;

  productCarr: Carrito []=[];

  cerrar() {
    this.modal.emit(this.ventanaModalCerrada); 
  }

  agregarMas(object: Carrito): void {
    if (object.amountCantidad >= object.datos.amount) {
      alert("Cantidad máxima alcanzada");
      
      return; // Salimos de la función sin hacer más cambios
    }
  
    // Si no ha alcanzado el límite, incrementamos la cantidad
    object.amountCantidad += 1;
  
    // Si después de incrementar la cantidad supera el límite, establecemos la cantidad al máximo
    if (object.amountCantidad > object.datos.amount) {
      object.amountCantidad = object.datos.amount;
    }
    
    // Puedes agregar un control para desactivar el botón si el límite es alcanzado
    if (object.amountCantidad === object.datos.amount) {
      this.statusBoton = true; // Desactivar el botón si el límite se ha alcanzado
    } else {
      this.statusBoton = false; // Activar el botón si aún no se alcanzó el límite
    }
  }
  

  agregarMenos(object: Carrito, index: number): void {
    if (object.amountCantidad > 1) {
      object.amountCantidad -= 1;
      } else if (object.amountCantidad === 1) {
      object.amountCantidad -= 1;
      this.product.deleteCar(index);
    }
    
    console.log("Cantidad:", object.amountCantidad);
  }
  

  ngOnInit(): void {
    const storedProductId = localStorage.getItem('productId');
    const storedStandId = localStorage.getItem('standId');
    const carrito = this.product.getCar();

  this.productCarr = carrito;
  console.log("El carrito",this.productCarr)
}

}
