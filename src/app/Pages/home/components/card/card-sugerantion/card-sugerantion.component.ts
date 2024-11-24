import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-card-sugerantion',
  templateUrl: './card-sugerantion.component.html',
  styleUrl: './card-sugerantion.component.css'
})
export class CardSugerantionComponent {
  @Input() product: any;
}

