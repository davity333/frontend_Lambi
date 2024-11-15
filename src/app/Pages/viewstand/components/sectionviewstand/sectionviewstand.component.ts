import { Component } from '@angular/core';
import { StandByClientService } from '../../../negocios/services/stand-by-client.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sectionviewstand',
  templateUrl: './sectionviewstand.component.html',
  styleUrl: './sectionviewstand.component.css'
})
export class SectionviewstandComponent {
  idstand = 0
  standClient: any;
  idSeller = 0
  status = true
  constructor(private standByClient : StandByClientService){}


  ngOnInit(){
    const storedSeller = localStorage.getItem('standId');
    this.idstand = storedSeller ? JSON.parse(storedSeller): null;
    const standByClient = localStorage.getItem('seller');
    this.idSeller = standByClient ? JSON.parse(standByClient).idseller: null;
    if(this.idSeller > 0) {
        this.status = false
    }
    this.standByClient.getStandByClient(this.idstand).pipe(tap({
      next: (response) => {
        console.log( "OK",response);
      },
      error: (err) => {
        console.error('Error getting stand', err);
      }
    })).subscribe(
      data => {
        this.standClient = data;
        console.log(this.standClient);
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

  previous(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

}
