import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { createSellerUsersService } from '../../../Auth/users.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-comunicacion',
  templateUrl: './comunicacion.component.html',
  styleUrl: './comunicacion.component.css'
})
export class ComunicacionComponent{

  constructor(private usersService: createSellerUsersService){}
  usersServices = inject(createSellerUsersService);

    ngOnInit(): void {
        const status = this.usersService.getStatusSeller();
        console.log("el estado es: ", status);
        localStorage.removeItem('standId');
    }
}
