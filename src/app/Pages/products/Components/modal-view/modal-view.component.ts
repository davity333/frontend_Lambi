import { Component } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrl: './modal-view.component.css'
})
export class ModalViewComponent {
@Output() statusModalClose:EventEmitter<boolean> = new EventEmitter<boolean>();
@Input() product: any;

closeModalView(){
  this.statusModalClose.emit(false);
}
}
