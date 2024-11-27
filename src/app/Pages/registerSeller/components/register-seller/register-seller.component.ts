import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createSellerUsersService } from '../../../Auth/users.service';
import { tap } from 'rxjs';
import { UserRegister } from '../../../register/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-seller',
  templateUrl: './register-seller.component.html',
  styleUrl: './register-seller.component.css'
})
export class RegisterSellerComponent {
  alertaNegative:boolean = false;
  alertaPositiva: boolean = false;
  mensajeAlerta:string='';
    registerSellerForm: FormGroup;
    constructor(private userService: createSellerUsersService, private router:Router){
      this.registerSellerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        e_mail: new FormControl('', [Validators.email]),
        password: new FormControl('', [Validators.required])
      });
    }
    registerSeller() {
      if (this.registerSellerForm.valid) {
        this.userService.createSeller(this.registerSellerForm.value).pipe(tap({
            next: (response) => {
              const seller = response.body; 
          const sellerName = seller?.name;
          localStorage.setItem("userName", sellerName);
              localStorage.setItem('seller', JSON.stringify(response.body))
              const authorizationHeader = response.headers?.get('Authorization');
              console.log("Encabezado Authorization:", authorizationHeader); 
              this.alertaPositiva = true;
              this.mensajeAlerta = "Vendedor registrado con éxito";
      
              if (authorizationHeader?.startsWith('Bearer ')) {
                const token = authorizationHeader.split(' ')[1];
                if (token) {
                  localStorage.setItem('token', token);
                }
              }
              else {
                console.error("Token no encontrado en el encabezado Authorization");
              }
              console.log(response);
                               setTimeout(() => {
                this.router.navigate(['/negocios'])
              }, 2000);
              
            },
            error: (err) => {
              alert("Error con la API");
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
