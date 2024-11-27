import { Component, inject } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';
import { Product } from '../../../gestion-productos/Models/product';
import { createSellerUsersService } from '../../../Auth/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sectionviewstand',
  templateUrl: './sectionviewstand.component.html',
  styleUrl: './sectionviewstand.component.css'
})
export class SectionviewstandComponent {
  idstand = 0
  idBuyer = 0
  standClient: any;
  idSeller = 0
  status = true
  stars = 0
  statusModalModal:boolean = false;
  isLoading = true;
  isError = false;
  ratingStand:number = 0;
  nameStand:string = "";
  nameBuyer:string = "";
  phoneBuyer:string = "";
  send_to_house:boolean = false;
  constructor(private standByClient : StandByClientService, private usersService: createSellerUsersService){}
  router = inject(Router);
  usersServices = inject(createSellerUsersService);
  mensajeAlerta:string = "";
  tituloAlerta:string = "";
  alertaQuestion:boolean = false;
  confirmation:boolean = false;
  negation:boolean = false;
  mensajeAlertaConfirmation:string = "";
  mensajeAlertaNegacion:string = "";
  ngOnInit(){
    let edit = 0; 
    localStorage.setItem('edit', edit.toString());
    const storedSeller = localStorage.getItem('standId');
    this.idstand = storedSeller ? JSON.parse(storedSeller): null;
    const standByClient = localStorage.getItem('seller');
    this.idSeller = standByClient ? JSON.parse(standByClient): null;
    const idBuyer = localStorage.getItem('buyer');
    this.idBuyer = idBuyer ? JSON.parse(idBuyer).idbuyer: null;
    this.nameBuyer = idBuyer ? JSON.parse(idBuyer).name: null;
    this.idSeller = standByClient ? JSON.parse(standByClient).idseller: null;
    console.log("la idStand es"+this.idstand)
    
    if(this.idSeller > 0) {
        this.status = false
    }
    this.isLoading = false;
    this.standByClient.getStandByClient(this.idstand).pipe(tap({
      next: (response) => {
        console.log( "OK",response);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error getting stand', err);
        this.isLoading = false;
        this.isError = true;
      }
    })).subscribe(
      data => {
        this.standClient = data;
        this.send_to_house = this.standClient.send_to_house;
        this.standByClient.setNameStand(this.standClient.name);
        this.standByClient.setNameBuyer(this.nameBuyer);
        this.standByClient.setPhoneBuyer(this.phoneBuyer);
        this.ratingStand = parseInt(this.standClient.rating);
        console.log("ratingStand",this.ratingStand);
        console.log("standClient",this.standClient);
      }
    )

  }
 
  currentImageIndex = 0;

  next(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.standClient.image.length;
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  previous(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.standClient.image.length) % this.standClient.image.length;
  }
  rating(){
    if(this.standClient.rating == null){
      this.addRating()  
    }else{
      this.updateRatingStand()
    }
  }
  getStarArrayStand(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < this.ratingStand);
  }

  addRating() {
    if (this.stars === 0) {
      this.stars = 5;
    }
    this.standByClient.addRating(this.idBuyer, this.idstand, this.stars).pipe(
      tap({
        next: (response) => {
          alert("Rating enviando exitosamente!")
          console.log("Rating enviado correctamente", response);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al calificar el stand', err);
          this.isLoading = false;
        }
      })
    ).subscribe();
  }
  
  getStarArray(): boolean[] {
    return Array(5).fill(false).map((_, index) => index < this.stars);
  }
  
  updateStars(starIndex: number): void {
    this.stars = starIndex + 1; 
  }

  updateRatingStand(){
    this.standByClient.updateRatingStand(this.idstand, this.idBuyer, this.stars).pipe(
      tap({
        next: (response) => {
          alert("Rating enviando exitosamente!")
          console.log("Rating enviado correctamente", response);
        },
        error: (err) => {
          console.error('Error al calificar el stand', err);
        }
      })
    ).subscribe();

  }

  shoppingCart(){
   
  }

  agregarProductos(){
    localStorage.setItem('standId', this.idstand.toString());
    this.router.navigate(['/gestionProducto']);
  }

  editarStand(){
    let edit : number = 1;
    localStorage.setItem('standId', this.idstand.toString());
    localStorage.setItem('edit', edit.toString());
    this.router.navigate(['/crearPuesto']);
  }

    mostrarAlerta(): void {
    this.alertaQuestion = true;
    this.tituloAlerta = 'Eliminar Puesto';
    this.mensajeAlerta = '¿Estás seguro de querer eliminar este puesto?';
  }

  // Manejar respuesta del componente hijo
  manejarRespuesta(confirmado: boolean): void {
    this.alertaQuestion = false; 

    if (confirmado) {
      this.eliminarPuesto();
    } else {
        this.confirmation = true;
        this.mensajeAlertaConfirmation = "Accion cancelada";
    }
  }

  eliminarPuesto(): void {
  console.log("ESTAS INTENTANDO ELIMINAR EL PUESTO CON EL ID: ",this.idstand);
    this.standByClient.deleteStand(this.idstand).pipe(tap({
      next: (response) => {
        this.confirmation = true;
        this.mensajeAlertaConfirmation = "Puesto eliminado exitosamente";
            setTimeout(() => {
            this.router.navigate(['/negocios']);
            }, 3000);
      },
      error: (err) => {
        this.negation = true;
        this.mensajeAlertaNegacion = "Error al eliminar el puesto";
        console.error('Error al eliminar el puesto', err);
      }
    })).subscribe();
  }
}
