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
  
export interface ProductCarr {
    cantidad: number,
    Product: Productos[];  
}
