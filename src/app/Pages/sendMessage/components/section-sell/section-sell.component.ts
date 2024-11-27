import { Component, OnInit } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-section-sell',
  templateUrl: './section-sell.component.html',
  styleUrls: ['./section-sell.component.css'] // Corrige el typo en `styleUrls`
})
export class SectionSellComponent implements OnInit {
  standId: number = 0;
  sells: any[] = [];
  
  constructor(private standService: StandByClientService) {}

  ngOnInit(): void {
    const storedSeller = localStorage.getItem('standId');
    this.standId = storedSeller ? JSON.parse(storedSeller) : null;

    this.standService.getSellsByStandId(this.standId).pipe(tap({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    })).subscribe(
      data => {
        // Agrupar ventas por idsell
        const grouped = new Map();

        data.forEach((sell: any) => {
          if (!grouped.has(sell.idsell)) {
            grouped.set(sell.idsell, {
              idsell: sell.idsell,
              description: sell.sell_description,
              total_price: 0,
              hour: sell.hour,
              products: [] // Arreglo para los productos relacionados
            });
          }
          // Agregar el producto actual al grupo correspondiente
          const group = grouped.get(sell.idsell);
          group.total_price += sell.total_price;
          group.products.push({
            idproduct: sell.idproduct,
            name: sell.name,
            price: sell.price,
            product_description: sell.product_description,
            amount: sell.amount,
            date: sell.date,
            hour: sell.hour,
            idbuyer: sell.idbuyer,
            image: sell.image
          });
        });

        // Convertir el mapa a un arreglo
        this.sells = Array.from(grouped.values());
        console.log(this.sells); // Para depuración
      }
    );
  }
  isModalOpen: boolean = false;
  modalProducts: any[] = [];

  // Abrir el modal con los productos
  openModal(products: any[]): void {
    this.modalProducts = products;
    this.isModalOpen = true;
  }

  // Cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalProducts = [];
  }

  // Calcular el total general de todas las ventas
  calculateTotal(): number {
    return this.sells.reduce((total, sell) => total + sell.total_price, 0);
  }
}
