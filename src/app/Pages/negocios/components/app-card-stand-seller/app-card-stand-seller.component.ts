import { Component } from '@angular/core';
import { Input ,Output, EventEmitter} from '@angular/core';
import { OnInit } from '@angular/core';
import { PuestoService } from '../../../agregar-puesto/Services/puesto.service';
import { Categoria } from '../../../agregar-puesto/Models/estados';
@Component({
  selector: 'app-app-card-stand-seller',
  templateUrl: './app-card-stand-seller.component.html',
  styleUrl: './app-card-stand-seller.component.css'
})
export class AppCardStandSellerComponent implements OnInit {
@Input() mystand : any;
@Output() idStand = new EventEmitter<number>();
categori = "";
categories: Categoria[] = [];
  constructor(readonly puestoService: PuestoService,) { }

  sendIdStand() {
    this.idStand.emit(this.mystand.idstand);
  }

  ngOnInit(): void {
    this.puestoService.getCategorias().subscribe((res) => {
      this.categori = this.mystand.category;
      const matchedCategory = res.find(
        (cat) => cat.idcategory == this.mystand.category
      );
      this.categori = matchedCategory ? matchedCategory.category : "No existe";
      this.categories = res;
    });
}
}