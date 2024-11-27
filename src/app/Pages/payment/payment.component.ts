import { Component, OnInit } from '@angular/core';
import { PaymentService } from './services/payment.service'
import { SellRequest } from './models/sell-request';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { pipe, tap } from 'rxjs';
import { ProductsService } from '../gestion-productos/service/products.service';
declare var Stripe: any;
import { StandByClientService } from '../negocios/services/stand-by-client.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  message: string | null = null;
  standIdFk: number = 0;
  idBuyer: number = 0;
  productCarr: any[] = [];
  isSuccess: boolean = false;
  total: number = 0;
  mensaje: string = '';
  direccion_entrega:FormGroup
  isError: boolean = false;
  constructor(private paymentService: PaymentService, private productService: ProductsService, private standService: StandByClientService) {
    this.direccion_entrega = new FormGroup({
      location: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    const storedStandId = localStorage.getItem('standId');
    this.standIdFk = Number(storedStandId);

    // Obtener información del comprador desde localStorage
    const Idbuyer = localStorage.getItem('buyer');
    this.idBuyer = Idbuyer ? JSON.parse(Idbuyer).idbuyer : null;

    // Obtener carrito de compras desde el servicio
    const carrito = this.productService.getCar();
    this.productCarr = carrito;

    // Calcular el total al entrar
    this.calcularTotal();
  }

  submitPayment(event: Event) {
    this.standService.createSell(this.nuevoCarrito()).pipe(tap({
      next: (res) => {
        console.log(res);
        setTimeout(() => {
          this.isSuccess = true;
          this.mensaje = 'Pago realizado correctamente';
        }, 1000);
      },
      error: (err) => {
        console.log(err);
        this.isError = true;
        this.mensaje = 'Error al realizar el pago';
      }
    })).subscribe();

  }
  nuevoCarrito() {
    const carritoNuevo: SellRequest = {
      hour: new Date().toLocaleTimeString(), // Hora actual
      date: new Date().toLocaleDateString(), // Fecha actual
      description: 'Orden de compra', // Cambia esto según lo que necesites
      standid_fk: Number(this.standIdFk), // ID del stand
      idbuyer: Number(this.idBuyer),
      direccion_entrega: this.direccion_entrega.get('location')?.value || '',
      sells: this.productCarr.map((item) => ({
        idproduct: item.idproduct,
        amount: item.amountCantidad
      }))
    };
    return carritoNuevo;


  }
  calcularTotal(): void {
    // Recalcular el total basado en los productos del carrito
    this.total = this.productCarr.reduce((acc, item) => acc + (item.amountCantidad * item.datos.price), 0);
}
}
/*export class PaymentComponent implements OnInit {

  
  stripe: any;
  elements: any;
  card: any;
  totalPrice: number = 0;
  tarjetaForm: FormGroup;
  sellRequest: SellRequest = {
    hour: '12:00',
    date: '2024-11-17',
    description: 'Compra de prueba',
    sellerid: 1,
    idbuyer: 2,
    sells: [
      { idproduct: 1, amount: 3 },
      { idproduct: 2, amount: 2 }
    ]
  };

  constructor(private paymentService: PaymentService) {
    this.tarjetaForm = new FormGroup({
      banco: new FormControl('', Validators.required),
      titular: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      numeroTarjeta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      fechaExpiracion: new FormControl('', Validators.required),
      cvv: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')])
    });
  }

  ngOnInit() {
    // Inicializar Stripe y Elements
    this.stripe = Stripe('your-publishable-key'); // Asegúrate de usar tu clave pública de Stripe
    this.elements = this.stripe.elements();

    // Crear el campo de tarjeta
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  submitPayment() {
    alert('Pago realizado');

    
  }
  
}*/
