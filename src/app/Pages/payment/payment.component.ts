import { Component, OnInit } from '@angular/core';
import { PaymentService } from './services/payment.service'
import { SellRequest } from './models/sell-request';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { pipe, tap } from 'rxjs';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  message: string | null = null;

  constructor(private paymentService: PaymentService) {}

  submitPayment(event: Event) {
    event.preventDefault();

    const paymentDetails: SellRequest = {
      hour: '12:00',
      date: '2024-11-21',
      description: 'Compra de prueba',
      standid: 53,
      idbuyer: 40,
      sells: [
        { idproduct: 14, amount: 1 },
        { idproduct: 18, amount: 1 }
      ]
    };

    this.paymentService.createPayment(paymentDetails).pipe(tap({
      next: (response) => {
        this.message = 'Pago iniciado. Confirma el pago en el frontend.';
        alert(this.message);
        console.log(response);
      },
      error: (err) => {
        this.message = `Error al procesar el pago: ${err}`;
        alert(this.message);
        console.warn(err);
      },
    })).subscribe();
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
