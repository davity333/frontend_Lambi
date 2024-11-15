import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { createSellerUsersService } from '../../../Auth/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  router = inject(Router);
  usersService = inject(createSellerUsersService);

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
