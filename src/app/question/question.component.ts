import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() message: string = '';
  @Input() title: string = '';
  @Output() response = new EventEmitter<boolean>();

  sendTrue(){
    this.response.emit(true);
  }
  sendFalse(){
    this.response.emit(false);
  }
}
