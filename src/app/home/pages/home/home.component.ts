import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../products/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  contactForm!: FormGroup;

  services = [
    {
      iconClass: 'fas fa-users text-4xl text-blue-600',
      title: 'Gestión de Productos',
      description: 'Administra eficientemente los productos con roles personalizados para un mejor control.',
    },
    {
      iconClass: 'fas fa-eye text-4xl text-green-600',
      title: 'Visualización Segura',
      description: 'Permite a los visualizadores acceder a la información relevante sin comprometer la seguridad.',
    },
  ];

  testimonials = [
    {
      name: 'Juan Pérez',
      review:
        'Esta plataforma ha sido fundamental para gestionar nuestros productos de forma eficiente. ¡Totalmente recomendable!',
      rating: 5,
    },
    {
      name: 'María Gómez',
      review:
        'Me encanta lo fácil que es visualizar y acceder a la información como visualizador. Muy intuitiva.',
      rating: 4,
    },
  ];

  constructor(
    private viewportScroller: ViewportScroller,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]], // 7-15 dígitos numéricos
    });
  }

  ngOnInit(): void {

  }

  scrollToContact() {
    this.viewportScroller.scrollToAnchor('contacto');
  }

  onSubmitContactForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Mostrar spinner de carga con Swal
    Swal.fire({
      title: 'Actualizando...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const formValue = this.contactForm.value;
    this.productService.sendContactEmail(formValue).subscribe({
      next: () => {
        Swal.close(); // Cerrar el spinner
        Swal.fire('¡Mensaje Enviado!', 'Nos pondremos en contacto pronto.', 'success');
        this.contactForm.reset(); // Resetea el formulario reactivo
      },
      error: (err) => {
        Swal.close(); // Cerrar el spinner
        console.error('Error al enviar el mensaje:', err);
        Swal.fire('Error', 'No se pudo enviar el mensaje. Intenta más tarde.', 'error');
      }
    });
  }
}
