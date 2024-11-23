import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { createSellerUsersService } from '../../../Auth/users.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  router = inject(Router);
  usersService = inject(createSellerUsersService);
  nombreUsuario:String | null = null;

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('buyer');
    localStorage.removeItem('seller');
    localStorage.removeItem('status')
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
      this.nombreUsuario = localStorage.getItem('userName')
  }
}
