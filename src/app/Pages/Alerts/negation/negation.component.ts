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
        // Configurar la transición de opacidad para durar 2 segundos
        modal.style.transition = 'opacity 2s ease';
        
        // Iniciar el desvanecimiento
        modal.style.opacity = '0'; 
        
        // Después de 2 segundos, ocultar el modal con visibility
        setTimeout(() => {
          modal.style.visibility = 'hidden'; 
        }, 5000); // Esto se ejecuta después de que termine la transición de opacidad
      }
    }, 5000); // Espera 5 segundos antes de iniciar el desvanecimiento
  }
  
}
