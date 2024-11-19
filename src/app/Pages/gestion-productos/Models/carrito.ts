import { Productos } from "./product";

export interface Carrito {
    datos: Productos;
    amountCantidad: number;
    standId: string | null;
    idproduct: number;
  }