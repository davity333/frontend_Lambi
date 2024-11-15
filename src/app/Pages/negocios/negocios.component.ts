import { Component } from '@angular/core';
import { StandByClientService } from './services/stand-by-client.service';
import { log } from 'console';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrl: './negocios.component.css'
})
export class NegociosComponent {
  constructor(private standByClientService: StandByClientService){}
  ngOnInit(): void {

     
  }
}
