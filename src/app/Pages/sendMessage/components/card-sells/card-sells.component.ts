import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-sells',
  templateUrl: './card-sells.component.html',
  styleUrl: './card-sells.component.css'
})
export class CardSellsComponent {
@Input() sell: any;

}
