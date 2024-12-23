import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCarr, ProductUpdate } from '../Models/product';
import { HttpHeaders } from '@angular/common/http';
import { BlobOptions } from 'buffer';
import { CategoryProduct } from '../Models/categoryProduct';
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

  addProduct(producto: any): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = "http://52.72.44.45:8000/api/protected/products/";
    return this.httpClient.post<any>(url, producto, {headers});
  }

  updateProduct( id: number, producto: ProductUpdate): Observable<Product>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = `http://52.72.44.45:8000/api/protected/products/${id}`;
    return this.httpClient.put<Product>(url, producto, {headers});
  }
  getCategoryProduct(): Observable<CategoryProduct[]>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = `http://52.72.44.45:8000/api/protected/categoryProduct/`;
    return this.httpClient.get<CategoryProduct[]>(url, {headers});
  }
  deletedProduct(id: number): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = `http://52.72.44.45:8000/api/protected/products?product_id=${id}`;
    return this.httpClient.delete<any>(url, {headers});
  }
  editAddImages(product_id: number, image: any): Observable<any>{
    let token = localStorage.getItem('token');
    let headers; 
    headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let url = `http://52.72.44.45:8000/api/protected/products/images/${product_id}`
    return this.httpClient.put<any>(url,image,{headers})
  }
  getProductId(index: number): Observable<Product[]> {
    let url = `http://52.72.44.45:8000/api/productsWithStandId/${index}`;
    return this.httpClient.get<Product[]>(url);
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