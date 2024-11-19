export interface Sell {
    hour: string;
    date: string;
    description: string;
    standid: number; 
    idbuyer: number;
    sells: Array<{  
      idproduct: number;
      amount: number;
    }>;
  }
  