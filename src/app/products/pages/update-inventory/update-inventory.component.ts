import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Importar el servicio

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.scss']
})
export class UpdateInventoryComponent implements OnInit {
  products: any[] = [];
  selectedProductId: number = 0;
  newQuantity: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.getProducts(); // Obtener productos al inicializar el componente
  }

  // Obtener todos los productos desde el backend
  // getProducts(): void {
  //   this.productService.getProducts().subscribe(data => {
  //     this.products = data;
  //   });
  // }

  // Actualizar inventario del producto seleccionado
  updateInventory(): void {
    this.productService.updateInventory(this.selectedProductId, this.newQuantity).subscribe(response => {
      alert('Inventario actualizado con éxito');
      // this.getProducts(); // Recargar la lista de productos después de actualizar
    }, error => {
      alert('Hubo un error al actualizar el inventario');
    });
  }
}
