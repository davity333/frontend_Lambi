import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  users:FormGroup;

  constructor() {
    this.users = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.email])
    });
  }

  login(){
    if(this.users.valid){
      alert("usuario agregado")
    }else{
      alert("Por favor llene todos los campos correctamente")
    }

    

  }

}
