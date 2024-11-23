import { Component } from '@angular/core';
import { CategoryService } from '../../../busqueda/services/category.service';
import { tap } from 'rxjs';
import { Product } from '../../../gestion-productos/Models/product';
import { Carrito } from '../../../gestion-productos/Models/carrito';
import { ProductsService } from '../../../gestion-productos/service/products.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  products: Product[] = [];
  isError: boolean = false;
  ventanaModal: boolean = false;
  productToSend: Product | null = null;
  statusModalModal: boolean = false;
  filteredProducts: Product[] = [];
  palabraInput: string = '';

  constructor(private categoryService: CategoryService, private product: ProductsService) { }
  ngOnInit(): void {
    this.categoryService.getAllProducts().pipe(tap({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        this.isError = true;
        console.log(response);
      }
    })).subscribe(
      data => {
       this.products = data;
      }
    )
  }

  searchProduct(event: string): void {
    if (!event.trim()) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(event.toLowerCase())
    );
  }

  selectProduct(product: Product): void {
    this.palabraInput = product.name;
    this.filteredProducts = []; 
    console.log('Producto seleccionado:', product);
  }
  abrirModal(object: any): void {
    this.ventanaModal=true;
    
    const productId = localStorage.getItem('productId');
    const standId = localStorage.getItem('standId');
    console.log("ProductID",productId, "StandID",standId)

    const carrito: Carrito = {
      datos: object,
      amountCantidad: 1,
      standId: standId,
      idproduct: object.idproduct,
    };

    console.log("Datos al Carrito:", carrito);
 
      this.product.addCar(carrito);


    
  }

  cerrarModal($event : any){
      this.ventanaModal = $event;
  }
  openModal(object:any){
    this.productToSend = object;
    this.statusModalModal = true;
  }
  closeModal(event:any){
    this.statusModalModal = event;
    this.productToSend = null;
  }

}
