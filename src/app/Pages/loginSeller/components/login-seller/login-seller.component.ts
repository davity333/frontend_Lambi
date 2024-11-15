import { Component } from '@angular/core';
import { createSellerUsersService } from '../../../Auth/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UserLogin } from '../../../register/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-seller',
  templateUrl: './login-seller.component.html',
  styleUrl: './login-seller.component.css'
})
export class LoginSellerComponent {
  userSeller: FormGroup;
  constructor(private usersService: createSellerUsersService, private router: Router){
    this.userSeller = new FormGroup({
      e_mail: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(){

  }
  loginSeller() {
    
    let userLogin: UserLogin = {
      e_mail: this.userSeller.value.e_mail,
      password: this.userSeller.value.password
    };
  
    console.log("Datos que se van a enviar:", userLogin);
  
    this.usersService.loginSeller(userLogin).pipe(
      tap({
        next: (response) => {
          console.log("Respuesta completa:", response.body); 
          localStorage.setItem('seller', JSON.stringify(response.body))
          const authorizationHeader = response.headers?.get('Authorization');
          console.log("Encabezado Authorization:", authorizationHeader); 
  
          if (authorizationHeader?.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1];
            if (token) {
              localStorage.setItem('token', token);
              
              alert("Usuario encontrado con éxito");
              this.router.navigate(['/negocios'])
            } else {
              console.error("Token no encontrado en el encabezado Authorization");
            }
          } else {
            console.error("Encabezado Authorization no encontrado o vacío en la respuesta");
          }
        },
        error: (err) => {
          console.error('Error durante el login:', err);
          if (err.status === 404) {
            alert("Email no encontrado");
          } else if (err.status === 401) {
            alert("Contraseña incorrecta");
          } else if (err.status === 422) {
            alert("Error de validación");
          } else {
            alert("Error inesperado");
          }
        }
      })
    ).subscribe();
  }
}
