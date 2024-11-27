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


  ngOnInit(){
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
  images: string[] = [
    'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_website/es/cms/SEO/recipes/albondigas-caseras-de-cerdo-con-salsa-barbacoa.jpeg',
    'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_s3/image/HF_Y24_R16_W02_ES_ESSGB17598-4_Main_high-48eefd40.jpg',
    'https://img.hellofresh.com/w_3840,q_auto,f_auto,c_fill,fl_lossy/hellofresh_s3/image/HF_Y24_R16_W24_ES_ESSGPB21283-2_Main_high-97359b19.jpg',
  ];
  currentImageIndex = 0;

  next(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
  goToHome(){
    this.router.navigate(['/home']);
  }

  previous(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
  rating(){
    if(this.standClient.rating == null){
      this.addRating() 
      this.ngOnInit()
    }else{
      this.updateRatingStand()
      this.ngOnInit()
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
          this.ngOnInit()
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
    localStorage.setItem('standId', this.idstand.toString());
    this.router.navigate(['/crearPuesto']);
  }
}
