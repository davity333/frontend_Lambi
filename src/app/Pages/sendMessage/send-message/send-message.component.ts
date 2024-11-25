import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../../gestion-productos/service/products.service';
import { ProductsService } from '../../gestion-productos/service/products.service';
import { StandByClientService } from '../../negocios/services/stand-by-client.service';
import { SellRequest } from '../../payment/models/sell-request';
import { tap } from 'rxjs';
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {
  productCarr: Carrito[] = [];
  standIdFk: number = 0;
  idBuyer: number = 0;
  total: number = 0;
  isSuccess: boolean = false;
  constructor(private router: Router, private productService: ProductsService, private standService: StandByClientService){}
  ngOnInit(): void {
    const storedProductId = localStorage.getItem('productId');
    const storedStandId = localStorage.getItem('standId');
    this.standIdFk = Number(storedStandId);
    const Idbuyer = localStorage.getItem('buyer');
    this.idBuyer = Idbuyer ? JSON.parse(Idbuyer).idbuyer : null;
    const carrito = this.productService.getCar();
    this.productCarr = carrito;
  }

  saveShoppingCart(){
    // Aquí calculamos el total del carrito
    this.standService.createSell(this.nuevoCarrito()).pipe(tap({
      next: (res) => {
        console.log(res);
        this.isSuccess = true;
        
      },
      error: (err) => {
        console.log(err);
      }
    })).subscribe();
    const total = this.calcularTotal();

    // Crear el mensaje con la estructura profesional
    const mensajeProfesional = this.crearMensajeProfesional(total);


    // Aquí podrías enviar el mensaje a WhatsApp
    this.enviarWhatsApp(mensajeProfesional);
    this.router.navigate(['/viewstand']);

  }


  calcularTotal(): number {
    return this.productCarr.reduce((acc, item) => acc + (item.amountCantidad * item.datos.price), 0);
  }

  crearMensajeProfesional(total: number): string {
    // Crear un mensaje con formato profesional
    const productosDetalles = this.productCarr.map(item => 
      `- ${item.datos.name}: ${item.amountCantidad} unidades a $${item.datos.price} c/u`
    ).join("\n");

    const mensaje = `
    \u{1F6D2} *Carrito de compras*
    \u{1F4C5} Fecha: ${new Date().toLocaleDateString()}
    \u{23F0} Hora: ${new Date().toLocaleTimeString()}
    📌 Nombre del puesto: ${this.standService.getNameStand()}
    👤 Nombre del comprador: ${this.standService.getNameBuyer()}
    
    🛍️ *Productos:*
    ${productosDetalles}
    
    \u{1F4B0} *Total: $${total.toFixed(2)}*
    `;
    
    return mensaje;
  }

  enviarWhatsApp(mensaje: string): void {
    // Codificar el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/529661605775?text=${mensajeCodificado}`;

    // Abrir la URL en una nueva ventana (esto abre WhatsApp con el mensaje prellenado)
    window.open(urlWhatsApp, '_blank');
  }

  nuevoCarrito() {
    const carritoNuevo: SellRequest = {
      hour: new Date().toLocaleTimeString(), // Hora actual
      date: new Date().toLocaleDateString(), // Fecha actual
      description: 'Descripción del carrito', // Cambia esto según lo que necesites
      standid_fk: Number(this.standIdFk), // ID del stand
      idbuyer: Number(this.idBuyer),
      sells: this.productCarr.map((item) => ({
        idproduct: item.idproduct,
        amount: item.amountCantidad
      }))
    };
  
    console.log("Nuevo carrito creado:", carritoNuevo);
    return carritoNuevo;


  }

  cancelShoppingCart(){
    this.router.navigate(['/viewstand']);
  }
  
}
