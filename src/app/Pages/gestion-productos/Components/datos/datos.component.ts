import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent {
  product: FormGroup;

  constructor(){
    this.product = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });
  }

  agregarProducto(){
    
  }
}
