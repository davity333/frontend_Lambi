import { Component } from '@angular/core';
import { CategoryService } from '../../../busqueda/services/category.service';
import { tap } from 'rxjs';
import { Product } from '../../../gestion-productos/Models/product';
import { Carrito } from '../../../gestion-productos/Models/carrito';
import { ProductsService } from '../../../gestion-productos/service/products.service';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
  textoMostrado: string = '';
  palabra: boolean = false;
  searchForm: FormGroup;
  productsFound: Product[] = [];
  fixed:boolean = true;
  isWindowAllProducts: boolean = true;
  constructor(private categoryService: CategoryService, private product: ProductsService, private router: Router) { 
    this.searchForm = new FormGroup({
      searchProducts: new FormControl('', Validators.required)
    })
  }
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
  watchProduct(object: any): void {
    localStorage.setItem('standId', JSON.stringify(object.standid));
    this.router.navigate(['/viewstand']);
  }
  abrirModal(object: any): void {
    this.ventanaModal=true;
    this.fixed = false
    const productId = localStorage.getItem('productId');
    const standId = localStorage.getItem('standId');

    const carrito: Carrito = {
      datos: object,
      amountCantidad: 1,
      standId: standId,
      idproduct: object.idproduct,
    };


    
  }

  cerrarModal($event : any){
      this.ventanaModal = $event;
      this.fixed = true;
  }
  openModal(object:any){
    this.productToSend = object;
    this.statusModalModal = true;
  }
  closeModal(event:any){
    this.statusModalModal = event;
    this.productToSend = null;
  }

  mostrarTexto(){
    this.categoryService.searchProducts(this.palabraInput).pipe(tap({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        this.products = [];
      }
    })).subscribe(
      data => {
        if(data.length > 0){
          this.products = data;
        }
        else{
          this.products = [];
        }


      }
    )
        this.textoMostrado = this.palabraInput;
        this.palabra = true;
        
      }
    


}
