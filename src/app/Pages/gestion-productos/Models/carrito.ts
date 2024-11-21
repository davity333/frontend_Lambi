import { Product } from "./product";

export interface Carrito {
    datos: Product;
    amountCantidad: number;
    standId: string | null;
    idproduct: number;
  }