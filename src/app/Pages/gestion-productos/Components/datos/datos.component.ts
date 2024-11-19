import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ProductsService } from '../../service/products.service';
import { CategoryProduct } from '../../Models/categoryProduct';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent{
  product: FormGroup;
  categorys: CategoryProduct[] = []
  constructor(readonly productService: ProductsService){
    this.product = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cantidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });
  }
}
