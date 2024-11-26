import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-sugerantion',
  templateUrl: './card-sugerantion.component.html',
  styleUrl: './card-sugerantion.component.css'
})
export class CardSugerantionComponent {
  @Input() product: any;
  constructor(private router: Router){}
  goToStand(){
    localStorage.setItem('standId', this.product.idstand);
    this.router.navigate(['/viewstand']);
  }
}

