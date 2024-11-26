import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { ProductsService } from '../../service/products.service';
import { EnviarProducto, Product, ProductUpdate } from '../../Models/product';
import { tap } from 'rxjs';
import { Categoria } from '../../../agregar-puesto/Models/estados';
import { CategoryProduct } from '../../Models/categoryProduct';
@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css'
})
export class ModalProductComponent{
  products:Product[]= [];
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter();
  @Output() editar: EventEmitter<boolean> = new EventEmitter();
  @Input() productToUpdateNow : EnviarProducto = {
    idProduct: 0,
    indexProduct: 0,
    arrayProduct: [],
    updateOrNot: false
  }
   formProduct: FormGroup;
   fotos: File[] = [];
   fotosPreview: string[] = []; 
   fotosSeleccionadas: number = 0;
   idstand : number = 0;
   categorias: CategoryProduct[] = [];
   tamanio: boolean = false;
   updateOrNot: boolean = false;  
   images: string[] =[];
   imageDelete: boolean = false
   constructor(private puesto: PuestoService, private productService: ProductsService){
    this.formProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    const storedSeller = localStorage.getItem('standId');
    this.idstand = storedSeller ? JSON.parse(storedSeller): null;
  this.productService.getCategoryProduct().pipe(tap({
    next: (response) => {
      console.log(response);
      this.categorias = response;
    },
    error: (err) => {
      console.error('Error al obtener las categorias', err);
    }
  })).subscribe();
  if(this.productToUpdateNow.updateOrNot){
    this.updateOrNot = this.productToUpdateNow.updateOrNot; 
    let product : Product = this.productToUpdateNow.arrayProduct[this.productToUpdateNow.indexProduct];
    this.formProduct.patchValue({
      name: product.name,
      category: product.category,
      amount: product.amount,
      price: product.price,
      description: product.description
    });
    this.images = product.image;
    console.log("imagenes", this.images)
  }
}
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement; // Casting explícito
  if (input.files) { // Verificar que input.files no es null
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
  closeModal(){
  this.cerrarModal.emit(false);
  if(this.updateOrNot ==true){
    this.updateOrNot = false;
    this.editar.emit(false);
  }  
  }
  addProduct(){
    const formData = new FormData();
    formData.append('name', this.formProduct.value.name);
    formData.append('category', this.formProduct.value.category);
    formData.append('amount', this.formProduct.value.amount);
    formData.append('price', this.formProduct.value.price.toString());
    formData.append('standid', this.idstand.toString())
    formData.append('description', this.formProduct.value.description)
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
  editProduct(){
    let producto : ProductUpdate ={
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      price: this.formProduct.value.price,
      amount: this.formProduct.value.amount,
      category: this.formProduct.value.category, 
      image: this.images
    }
    this.productService.updateProduct(this.productToUpdateNow.idProduct, producto).pipe(tap({
      next: (response) => {
        if(response == false){
          alert("Product no encontrado"); 
        }
        else {
          console.log(response);
          alert("Producto editado con éxito");
        }
      },
      error: (err) => {
        console.error('Error al editar el producto', err);
        alert("Ha ocurrido un error al editar el producto");
      }
    })).subscribe()
    this.fotos.forEach(file => {
      console.log("Se ha agregado");
      console.log(file);
      let formDataImage = new FormData();
      formDataImage.append('image', file, file.name); 
    });

  }
  removeImage(image: string): void {
    this.fotosPreview = this.fotosPreview.filter(img => img !== image);
    const fotosActualizadas = this.fotos.filter((img) => img.name !== image);
    this.fotos = fotosActualizadas;
    this.fotos = fotosActualizadas;
    this.fotosSeleccionadas = this.fotos.length;
  }
  deleteImage(index: number): void {
    this.images.splice(index, 1);
    this.imageDelete= true ;
    console.log('Imagen eliminada:', this.images);
  }
}
