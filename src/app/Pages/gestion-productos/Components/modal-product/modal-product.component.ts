import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrl: './modal-product.component.css'
})
export class ModalProductComponent {
  @Output() cerrarModal: EventEmitter<boolean> = new EventEmitter();

  closeModal(){
  this.cerrarModal.emit(false);  
  }

}
