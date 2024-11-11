import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})

export class SugerenciasComponent implements OnInit {
  sugerencias = [
    { nombre: "El Buen Sabor", categoria: "comida", img: "assets/puesto1.png" },
    { nombre: "La Tienda de Accesorios", categoria: "accesorios", img: "assets/puesto2.png" },
    { nombre: "Dulces Sueños", categoria: "antojos", img: "assets/puesto3.png" },
    { nombre: "Taller de Servicios Rápidos", categoria: "servicio", img: "assets/puesto4.png" },
    { nombre: "La Esquina del Postre", categoria: "comida", img: "assets/puesto5.png" },
    { nombre: "El café", categoria: "comida", img: "assets/puesto6.png" }
  ];

  currentCardIndex = 0;
  cardsToShow = 3;  // Mostrar 3 tarjetas a la vez

  ngOnInit(): void {}

  nextCard() {
    // Si la siguiente posición es mayor al límite, vuelve a la primera tarjeta
    this.currentCardIndex = (this.currentCardIndex + 1) % this.sugerencias.length;
  }
  

  prevCard() {
    // Si está en la primera tarjeta y retrocede, ve a la última tarjeta
    this.currentCardIndex =
      (this.currentCardIndex - 1 + this.sugerencias.length) % this.sugerencias.length;
  }
  

  getTransformStyle() {
    // Aplicar el desplazamiento de las tarjetas con la transición
    return `translateX(-${this.currentCardIndex * 320}px)`;  // Desplazamiento en función de la tarjeta actual
  }
}
