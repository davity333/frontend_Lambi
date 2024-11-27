import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createSellerUsersService } from '../Auth/users.service';
import { tap } from 'rxjs';
import { UserRegister } from './models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  users:FormGroup;
  userInterface:UserRegister[]=[];
  alertaNegative:boolean = false;
  alertaPositiva: boolean = false;
  mensajeAlerta:string='';

  constructor(private user:createSellerUsersService, private navegar: Router) {
    this.users = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      e_mail: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    if (this.users.valid) {
      this.user.createUser(this.users.value).pipe(tap({
          next: (response) => {
            this.alertaPositiva = true;
            this.mensajeAlerta = "Usuario registrado con éxito";
            console.log(response);
                setTimeout(() => {
                this.navegar.navigate(['/login'])
              }, 2000);
          },
          error: (err) => {
            this.alertaNegative = true;
            this.mensajeAlerta = "Error con la API";
            console.error('Error creating user', err);
          }
        })
      ).subscribe();
    } else {
      this.alertaNegative = true;
      this.mensajeAlerta = "Por favor llene todos los campos correctamente";  
    }
  }

}
