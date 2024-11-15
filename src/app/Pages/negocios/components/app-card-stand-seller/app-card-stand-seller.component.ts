import { Component } from '@angular/core';
import { Input ,Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-app-card-stand-seller',
  templateUrl: './app-card-stand-seller.component.html',
  styleUrl: './app-card-stand-seller.component.css'
})
export class AppCardStandSellerComponent {
@Input() mystand : any;
@Output() idStand = new EventEmitter<number>();
  constructor() { }
  sendIdStand() {
    this.idStand.emit(this.mystand.idstand);
  }
}
