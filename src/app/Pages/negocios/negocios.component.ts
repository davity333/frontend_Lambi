import { Component } from '@angular/core';
import { StandByClientService } from './services/stand-by-client.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { createSellerUsersService } from '../Auth/users.service';
@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrl: './negocios.component.css'
})
export class NegociosComponent {
  idSeller = 0
  status = true
  stands:any[] = [];
  isLoading = true;

  constructor(private standByClientService: StandByClientService, private router : Router, private userService: createSellerUsersService){}
  ngOnInit(): void {
    const storedSeller = localStorage.getItem('seller');
    this.idSeller = storedSeller ? JSON.parse(storedSeller).idseller : null;
    console.log("vendedor con id "+this.idSeller)
    this.standByClientService.getStandByClients(this.idSeller).pipe(tap({
      next: (response) => {
        if(response == false) {
          this.status = false;
    
        }
        console.log( "OK",response);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error getting stands', err);
        this.isLoading = false;
    
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
