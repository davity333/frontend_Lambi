import { Component } from '@angular/core';
import { createSellerUsersService } from '../../../Auth/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UserLogin } from '../../../register/models/user';
import { Router } from '@angular/router';
import { NegationComponent } from '../../../Alerts/negation/negation.component';
@Component({
  selector: 'app-login-seller',
  templateUrl: './login-seller.component.html',
  styleUrl: './login-seller.component.css'
})
export class LoginSellerComponent {
  userSeller: FormGroup;
  mensajeAlerta:string ='';
  isLoading = true;
  constructor(private usersService: createSellerUsersService, private router: Router){
    this.userSeller = new FormGroup({
      e_mail: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  
  alertaNegative:boolean = false;
  alertaPositiva:boolean = false;

    ngOnInit(){
      this.isLoading = false;

  }
  
  loginSeller() {
    let userLogin: UserLogin = {
      e_mail: this.userSeller.value.e_mail,
      password: this.userSeller.value.password
    };
  
    console.log("Datos que se van a enviar:", userLogin);
    this.isLoading = true;
    if(this.userSeller.valid){
      
      if (this.userSeller.get('e_mail')?.invalid) {
        this.alertaNegative = true;
        this.mensajeAlerta = 'Gmail no validado';
        return; 
      }
    this.usersService.loginSeller(userLogin).pipe(
      tap({
        next: (response) => {
          console.log("Respuesta completa:", response.body); 
          const seller = response.body; 
          const sellerName = seller?.name;
          localStorage.setItem("userName", sellerName);

          localStorage.setItem('seller', JSON.stringify(response.body))
          const authorizationHeader = response.headers?.get('Authorization');
          console.log("Encabezado Authorization:", authorizationHeader); 
  

          if (authorizationHeader?.startsWith('Bearer ')) {
            const token = authorizationHeader.split(' ')[1];
            if (token) {
              localStorage.setItem('token', token);
              
              this.alertaPositiva = true;
              this.mensajeAlerta = "Usuario encontrado con exito";
              this.usersService.setStatusSeller(true);
              console.log("el estado es: ", this.usersService.getStatusSeller());
              setTimeout(() => {
                this.router.navigate(['/negocios']);
              }, 3000);
            } else {
              console.error("Token no encontrado en el encabezado Authorization");
            }
          } else {
            console.error("Encabezado Authorization no encontrado o vacío en la respuesta");
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error durante el login:', err);
          if (err.status === 404) {
            this.alertaNegative = true;
          } else if (err.status === 401) {
            this.alertaNegative = true;
            this.mensajeAlerta = "Contraseña incorrecta";
          } else if (err.status === 422) {
            alert("Error de validación");
          } else {
            alert("Error inesperado");
          }
          this.isLoading = false;
        }
      })
    ).subscribe();
  }else{
    this.alertaNegative = true;
    this.mensajeAlerta = "Todos los campos son obligatorios";
  }


}
}
