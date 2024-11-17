import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-negation',
  templateUrl: './negation.component.html',
  styleUrl: './negation.component.css'
})
export class NegationComponent {

  @Input() mensajeEmail: string = '';

}
