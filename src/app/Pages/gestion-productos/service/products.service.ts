import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCarr } from '../Models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(readonly httpClient:HttpClient) { }
  private status = false;

  private carrito:Carrito [] = []; 

  getProducts(): Observable<Product[]> {
    let url = 'http://52.72.44.45:8000/api/products/';
    return this.httpClient.get<Product[]>(url);
  }

  getProductId(index: number): Observable<Product> {
    let url = `http://52.72.44.45:8000/api/products/${index}`;
    return this.httpClient.get<Product>(url);
  }

  getCar(): Carrito[] {  
    return this.carrito;
  }
  addCar(carrito: Carrito): void {
    const existingProduct = this.carrito.find(item => item.idproduct === carrito.idproduct);
    const dupliqueAmound = this.carrito.find(item => item.amountCantidad >= carrito.datos.amount);
    
    
    if (existingProduct) {
      existingProduct.amountCantidad += carrito.amountCantidad;
      
      if(dupliqueAmound){
    }else{
      return;
    }
      
    } else {
      this.carrito.push(carrito);
    }
  
  }

  deleteCar(index: number): void {
    this.carrito.splice(index, 1);
  }
  getStatus(){
    return this.status;
  }
  setStatus(status: boolean): void {
    this.status = status;
  }
}

export interface Productos {
  name: string;
  description: string;
  price: number;
  amount: number;
  category: string;
  image: string[];
  sellerid: number;
  idproduct: number;
}

export interface Carrito {
  datos: Productos;
  amountCantidad: number;
  standId: string | null;
  idproduct: number;
}