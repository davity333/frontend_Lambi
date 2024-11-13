import { Component } from '@angular/core';

@Component({
  selector: 'app-sectionviewstand',
  templateUrl: './sectionviewstand.component.html',
  styleUrl: './sectionviewstand.component.css'
})
export class SectionviewstandComponent {
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
