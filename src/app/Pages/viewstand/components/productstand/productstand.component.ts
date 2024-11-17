import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';
import { Product } from '../../../gestion-productos/Models/product';
@Component({
  selector: 'app-productstand',
  templateUrl: './productstand.component.html',
  styleUrl: './productstand.component.css'
})
export class ProductstandComponent implements OnInit {
  @Input() standid: number=0;
  products:Product[]=[];
  constructor(private standByClientService:StandByClientService) { }

  ngOnInit(): void {
      this.standByClientService.getProductsStand(this.standid).pipe(tap({
        next: (products) => {
          console.log('Productos del stand:', products);
          this.products = products;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      })).subscribe();
  }

}
