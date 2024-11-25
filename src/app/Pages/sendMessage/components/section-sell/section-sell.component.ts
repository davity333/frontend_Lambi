import { Component, OnInit } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-section-sell',
  templateUrl: './section-sell.component.html',
  styleUrl: './section-sell.component.css'
})
export class SectionSellComponent implements OnInit {
  standId: number = 0;
  
  constructor(private standService: StandByClientService) {}
  sells = [{description: 'Venta 1', date: '2021-01-01', amount: 100},
    {description: 'Venta 2', date: '2021-01-02', amount: 200},
    {description: 'Venta 3', date: '2021-01-03', amount: 300},
    {description: 'Venta 4', date: '2021-01-04', amount: 400},
    {description: 'Venta 5', date: '2021-01-05', amount: 500}

  ];
  ngOnInit(): void {
    const storedSeller = localStorage.getItem('standId');
    this.standId = storedSeller ? JSON.parse(storedSeller): null;
    this.standService.getSellsByStandId(this.standId).pipe(tap({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })).subscribe();
    }
}
