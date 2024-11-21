import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { tap } from 'rxjs';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Categoria } from '../../../agregar-puesto/Models/estados';
import { ProductsService } from '../../service/products.service';
import { Productos } from '../../Models/product';
import { TablaComponent } from '../tabla/tabla.component';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})

export class DatosComponent implements OnInit{
  productForm: FormGroup;
  indexProduct: number=0;
  products:Productos[]= [];
  categorias: Categoria[] = [];
  descripcion: string='descripcion';

  fotos: File[] = [];
  fotosSeleccionadas: number = 0;
  fotosPreview: string[] = []; 

  constructor(private puesto: PuestoService, private productService: ProductsService){
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  nombre:string = '';
  cantidad:number = 0;
  precio:number = 0;
  category:string ='';
  idstand : number = 0;
  idProducto:number = 0;

  recibirProducts($event: any){
      this.products = $event;
      const index = localStorage.getItem('indexProduct');
      this.indexProduct = Number(index);

      console.log("el nombre cambiado es",this.nombre)
      this.nombre = this.products[this.indexProduct].name
      this.cantidad = this.products[this.indexProduct].amount
      this.precio = this.products[this.indexProduct].price
      this.category = this.products[this.indexProduct].category
    }
    
    ngOnInit(): void {
      const storedSeller = localStorage.getItem('standId');
      this.idstand = storedSeller ? JSON.parse(storedSeller): null;
    this.puesto.getCategorias().pipe(tap({
      next: (response) => {
        console.log(response);
        this.categorias = response;
      },
      error: (err) => {
        console.error('Error al obtener las categorias', err);
      }
    })).subscribe();

    

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        this.fotos.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          this.fotosPreview.push(result);
        };
        reader.readAsDataURL(file); 
      }
      
      this.fotosSeleccionadas = this.fotos.length;
    }
  }

  removeImage(image: string): void {
    this.fotosPreview = this.fotosPreview.filter(img => img !== image);
    

    const fotosActualizadas = this.fotos.filter((img) => img.name !== image);
    this.fotos = fotosActualizadas;
  
    this.fotos = fotosActualizadas;
    this.fotosSeleccionadas = this.fotos.length;

  }

  agregarProducto(){
    const formData = new FormData();
  
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('amount', this.productForm.get('amount')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('standid', this.idstand.toString())
    formData.append('description', this.descripcion)
    this.fotos.forEach(file => {
      console.log("Se ha agregado");
      
      console.log(file);
      
      formData.append('image', file, file.name); 
    });

    this.productService.addProduct(formData).pipe(tap({
      next: (response) => {
        console.log(response);
        alert("Producto agregado con éxito");
      },
      error: (err) => {
        console.error('Error al agregar el producto', err);
        alert("Ha ocurrido un error al agregar el producto");
      }
    })).subscribe()
  }

  actualizarProducto(){

      const objeto={
          dataProdutc: this.productForm.value,
          description: this.descripcion,
          image: this.fotos,
      }

      console.log("el objeto que voy a actualizar",objeto);

      this.productService.updateProduct(objeto).pipe(tap({
        next: (response) => {
          console.log(response);
          alert("Producto actualizado con éxito");
        },
        error: (err) => {
          console.error('Error al actualizar el producto', err);
          alert("Ha ocurrido un error al actualizar el producto");
        }
      })).subscribe()
  }
}

