export interface SellRequest {
    hour: string;
    date: string;
    description: string;
    direccion_entrega: string;
    sells: Sell[];
    standid_fk: number;
    idbuyer: number;
  }
interface Sell {
    idproduct: number;
    amount: number;
}

