import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nothing-in-page',
  templateUrl: './nothing-in-page.component.html',
  styleUrl: './nothing-in-page.component.css'
})
export class NothingInPageComponent {
  @Input() message: string = '';
}
