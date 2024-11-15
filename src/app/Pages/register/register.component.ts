import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createSellerUsersService } from '../Auth/users.service';
import { tap } from 'rxjs';
import { UserRegister } from './models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  users:FormGroup;
  userInterface:UserRegister[]=[];
  

  constructor(private user:createSellerUsersService) {
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
