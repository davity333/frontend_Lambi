export interface SellRequest {
    hour: string;
    date: string;
    description: string;
    sellerid: number;
    idbuyer: number;
    sells: { idproduct: number; amount: number }[];
    cardToken?: string;  // Asegúrate de que cardToken sea opcional si lo vas a enviar solo cuando se crea el token
  }
  