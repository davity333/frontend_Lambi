export interface Product {
  name: string,
  description: string,
  price: number,
  amount: number,
  category: string,
  image: string[],
  sellerid: number,
  idproduct: number
}
export interface ProductUpdate{ 
    name?: string
    description?: string
    price?: number
    amount?: number
    category?: string
}
export interface ProductCarr {
  cantidad: number,
  Product: Product[];  
}