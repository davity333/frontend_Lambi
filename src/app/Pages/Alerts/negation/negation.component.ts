import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-negation',
  templateUrl: './negation.component.html',
  styleUrl: './negation.component.css'
})
export class NegationComponent implements OnInit {
  @Input() mensaje: string='';

  ngOnInit(): void {
    setTimeout(() => {
      const modal = document.getElementById('modal');
      if (modal) {
        modal.style.transition = 'opacity 2s ease';
        modal.style.opacity = '0'; 

        setTimeout(() => {
          modal.style.visibility = 'hidden'; 
        }, 3000); 
      }
    }, 3000); 
  }
  
}
