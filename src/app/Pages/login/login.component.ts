import { Component } from '@angular/core';
import { UsersService } from '../Auth/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users:FormGroup;

  constructor(private user:UsersService) {
    this.users = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  logear(){
    if (this.users.valid) {
      this.user.login(this.users.value).pipe(tap({
          next (response)  {
            if(response != null) {
              alert("Usuario encontrado con éxito");
              console.log(response);
            }
          },
          error (err)  {
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
