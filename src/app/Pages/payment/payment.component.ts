import { Component, OnInit } from '@angular/core';
import { PaymentService } from './services/payment.service'
import { SellRequest } from './models/sell-request';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  elements: any;
  card: any;
  totalPrice: number = 0;
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

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Inicializar Stripe y Elements
    this.stripe = Stripe('your-publishable-key'); // Asegúrate de usar tu clave pública de Stripe
    this.elements = this.stripe.elements();

    // Crear el campo de tarjeta
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  submitPayment() {
    // Crear un token de pago a partir de los detalles de la tarjeta
    this.stripe.createToken(this.card).then((result: any) => {
      if (result.error) {
        // Manejar el error, si lo hay
        console.error('Error en la tarjeta:', result.error.message);
      } else {
        // Enviar el token y la venta al backend para procesar el pago
        this.sellRequest.cardToken = result.token.id;
        this.paymentService.createPayment(this.sellRequest).subscribe(response => {
          console.log('Venta realizada', response);
        }, error => {
          console.error('Error al realizar la venta', error);
        });
      }
    });
  }
  
}
