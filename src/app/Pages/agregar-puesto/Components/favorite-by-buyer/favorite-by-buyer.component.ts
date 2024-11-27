import { Component, Input, Output, EventEmitter } from '@angular/core';
import { tap } from 'rxjs';
import { Categoria } from '../../Models/estados';
import { PuestoService } from '../../Services/puesto.service';
import { CategoryService } from '../../../busqueda/services/category.service';
@Component({
  selector: 'app-favorite-by-buyer',
  templateUrl: './favorite-by-buyer.component.html',
  styleUrl: './favorite-by-buyer.component.css'
})
export class FavoriteByBuyerComponent {
  @Input() stand: any;
  categories: Categoria[] = [];
  categori = "";
  idbuyer: number = 0;
  isSuccess: boolean = false;
  message: string = "";
  isError: boolean = false;

  constructor(
    readonly puestoService: PuestoService,
    private categoryService: CategoryService
  ) {}
  @Output() idStand = new EventEmitter<any>();
  viewStand(){
    this.idStand.emit(this.stand.idstand);
  }

  ngOnInit() {
    const Idbuyer = localStorage.getItem('buyer');
    this.idbuyer = Idbuyer ? JSON.parse(Idbuyer).idbuyer : null;

    this.puestoService.getCategorias().subscribe((res) => {
      this.categori = this.stand.category;
      const matchedCategory = res.find(
        (cat) => cat.idcategory == this.stand.category
      );
      this.categori = matchedCategory ? matchedCategory.category : "No existe";
      this.categories = res;
    });
  }

  watchStand() {
    const longitude = Number(this.stand.altitud);
    const latitude = Number(this.stand.latitud);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

  toggleFavorite() {
    if(this.stand.favorite_status === false && this.stand.favorite_user != null){
      this.changeStatusFavoriteTrue();
    }
    if(this.stand.favorite_status === true && this.stand.favorite_user != null){
      this.changeStatusFavoriteFalse();
    }
      if(this.stand.favorite_status === null && this.stand.favorite_user === null){
        this.addFavorite()
        
      }
    
  }

  addFavorite() {
    const idstand = this.stand.idstand;
  
      this.categoryService
      .addFavorite(idstand, this.idbuyer)
      .pipe(
        tap({
          next: (response) => {
            this.stand.favorite_status = true;
            this.isSuccess = true;
            this.message = "Agregado a favoritos";
            this.ngOnInit()
          },
          error: (err) => {
            console.error('Error al agregar a favoritos', err);
            this.isError = true;
            this.message = "Ha ocurrido un error al agregar este stand a favoritos";
           
          },
        })
      )
      .subscribe();
    
  }

  changeStatusFavoriteFalse(){
    const idstand = this.stand.idstand;
    this.categoryService.changeStatusFalse(this.idbuyer,idstand).pipe(tap({
      next: (response) => {
        this.stand.favorite_status = false;
        this.ngOnInit()
      },
      error: (err) => {
        console.error('Error al quitar de favoritos', err);
        this.isError = true;
        this.message = "Ha ocurrido un error al quitar este stand de favoritos";
      },
    })).subscribe()
  }
  
  changeStatusFavoriteTrue(){
    const idstand = this.stand.idstand;
    this.categoryService.changeStatusTrue(this.idbuyer,idstand).pipe(tap({
      next: (response) => {
        this.stand.favorite_status = true
        this.ngOnInit()

      },
      error: (err) => {
        console.error('Error al quitar de favoritos', err);
        this.isError = true;
        this.message = "Ha ocurrido un error al quitar este stand";
      },
    })).subscribe()
  }
}
