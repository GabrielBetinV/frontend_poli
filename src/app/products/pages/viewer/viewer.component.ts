import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
   this.loadProducts();
  }


    loadProducts() {
      // Mostrar spinner de carga con Swal
      Swal.fire({
        title: 'Cargando productos...',
        text: 'Por favor espera un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.productService.getProducts().subscribe({
        next: (res) => {
          Swal.close(); // Cerrar el spinner
          if (res.success) {
            this.products = res.data || [];
          } else {
            Swal.fire('Error', res.message || 'Ocurrió un error al cargar los productos', 'error');
          }
        },
        error: (err) => {
          Swal.close(); // Cerrar el spinner
          Swal.fire('Error', 'No se pudo obtener los productos => ' + err.message, 'error');
        },
      });
    }

}
