import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0; // Índice de la imagen actual
  totalImages = 3; // Número total de imágenes en el carrusel
  transformStyle: string = `translateX(0%)`; // Estilo para mover las imágenes
  intervalId: any; // ID del intervalo para autoavance

  constructor() { }

  ngOnInit(): void {
    this.startAutoSlide(); // Iniciar el autoavance
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpiar el intervalo al destruir el componente
    }
  }

  // Función para mover al siguiente slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex === this.totalImages - 1) ? 0 : this.currentIndex + 1;
    this.updateCarousel();
  }

  // Función para mover al slide anterior
  prevSlide(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.totalImages - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  // Función para actualizar el estilo del carrusel
  updateCarousel(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 100}%)`;
  }

  // Iniciar el autoavance cada 5 segundos
  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide(); // Mover al siguiente slide
    }, 5000); // Cada 5 segundos
  }
}
