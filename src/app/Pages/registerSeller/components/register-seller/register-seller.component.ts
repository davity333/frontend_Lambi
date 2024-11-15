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
              alert("Usuario registrado con éxito");
              console.log(response);
            },
            error: (err) => {
              alert("Error con la API");
              console.error('Error creating user', err);
            }
          })
        ).subscribe();
      } else {
        alert("Por favor llene todos los campos correctamente");
      }
    }
}
