import { Component } from '@angular/core';
import { StandByClientService } from './services/stand-by-client.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrl: './negocios.component.css'
})
export class NegociosComponent {
  idSeller = 0
  status = true
  stands:any[] = [];
  constructor(private standByClientService: StandByClientService, private router : Router){}
  ngOnInit(): void {
    const storedSeller = localStorage.getItem('seller');
    this.idSeller = storedSeller ? JSON.parse(storedSeller).idseller : null;
    this.standByClientService.getStandByClients(this.idSeller).pipe(tap({
      next: (response) => {
        if(response == false) {
          this.status = false;
        }
        console.log( "OK",response);
      },
      error: (err) => {
        console.error('Error getting stands', err);
      }
    })).subscribe( data => {
      this.stands = data;
      if(this.stands.length  === 1) {
        this.receiveIdStand(this.stands[0].idstand);
      }
      console.log(this.stands);
    }
    )
    
     
  }
  receiveIdStand($event: number) {
    localStorage.setItem('standId', JSON.stringify($event));
    this.router.navigate(['/viewstand']);
  }
}
