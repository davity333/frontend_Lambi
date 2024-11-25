import { Component } from '@angular/core';
import { createSellerUsersService } from '../Auth/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UserLogin } from '../register/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users: FormGroup;
  alertaNegacion:boolean = false;
  alertaAfirmacion: boolean = false;
  mensajeAlerta:string='';

  constructor(private user: createSellerUsersService, private navegar: Router) {
    this.users = new FormGroup({
      e_mail: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  logear() {
    
    let userLogin: UserLogin = {
      e_mail: this.users.value.e_mail,
      password: this.users.value.password
    };
  
    console.log("Datos que se van a enviar:", userLogin);
  
    this.user.login(userLogin).pipe(
      tap({
        next: (response) => {
          console.log("Respuesta completa:", response.body); 
          const seller = response.body; 
          const buyerName = seller?.name;
          localStorage.setItem("userName", buyerName);
          localStorage.setItem('buyer', JSON.stringify(response.body))
          const authorizationHeader = response.headers?.get('Authorization');
          console.log("Encabezado Authorization:", authorizationHeader); 
  
          if (authorizationHeader?.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1];
            if (token) {
              localStorage.setItem('token', token);
              this.user.setStatusSeller(false)
              this.alertaAfirmacion = true;
              this.mensajeAlerta = "Bienvenido usuario"
              console.log("Token almacenado:", token);
              setTimeout(() => {
                this.navegar.navigate(['/home'])
              }, 2000);
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

            this.alertaNegacion = true;
            this.mensajeAlerta = "Email no encontrado";
          } else if (err.status === 401) {
            this.alertaNegacion = true;
            this.mensajeAlerta = "Contrasela incorrecta";
          } else if (err.status === 422) {
            this.alertaNegacion = true;
            this.mensajeAlerta = "Error en validación";
          } else {
            this.alertaNegacion = true;
            this.mensajeAlerta = "Error inesperado";

          }
        }
      })
    ).subscribe();
  }
  
  
  
}