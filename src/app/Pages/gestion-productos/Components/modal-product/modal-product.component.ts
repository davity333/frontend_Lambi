import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../Models/product';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css'
})
export class ModalProductComponent{
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter();
  products:Product[]= [];
   formProduct: FormGroup;
   fotos: File[] = [];
   fotosPreview: string[] = []; 
   fotosSeleccionadas: number = 0;
   tamanio: boolean = false;
   constructor(private puesto: PuestoService, private productService: ProductsService){
    this.formProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
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
  closeModal(){
  this.cerrarModal.emit(false);  
  }
  addProduct(){

  }

  removeImage(image: string): void {
    this.fotosPreview = this.fotosPreview.filter(img => img !== image);
    const fotosActualizadas = this.fotos.filter((img) => img.name !== image);
    this.fotos = fotosActualizadas;
    this.fotos = fotosActualizadas;
    this.fotosSeleccionadas = this.fotos.length;
  }

}
