import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  newProductForm: FormGroup;
  imageFile: any;
  selectedImage: string | ArrayBuffer | null = null;
  selectedImageName: string = '';

  editMode = false;
  currentProductId: number | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    // Inicialización del formulario reactivo
    this.newProductForm = this.fb.group({
      provider_name: ['', Validators.required],
      product_name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    // Aquí puedes cargar los productos si es necesario
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

  addProduct() {
    if (this.newProductForm.valid) {
      const newProductDto = {
        provider_name: this.newProductForm.value.provider_name,
        product_name: this.newProductForm.value.product_name,
        image: this.imageFile, // La imagen se enviará en Base64
        quantity: this.newProductForm.value.quantity,
        price: this.newProductForm.value.price
      };

      // Mostrar spinner de carga con Swal
      Swal.fire({
        title: 'Creando producto...',
        text: 'Por favor espera un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.productService.createProduct(newProductDto).subscribe({
        next: (res) => {
          Swal.close(); // Cerrar el spinner
          if (res.success) {
            this.loadProducts();
            this.newProductForm.reset(); // Reset formulario después de agregar
            this.selectedImage = null; // Limpiar la imagen seleccionada
            Swal.fire('Éxito', 'Producto creado con éxito.', 'success');
          } else {
            Swal.fire('Error', res.message || 'Ocurrió un error al crear el producto', 'error');
          }
        },
        error: (err) => {
          Swal.close(); // Cerrar el spinner
          Swal.fire('Error', 'No se pudo crear el producto => ' + err.message, 'error');
        }
      });
    }
  }

  updateProduct() {
    if (this.newProductForm.valid && this.currentProductId !== null) {
      const updatedProductDto = {
        id: this.currentProductId,
        provider_name: this.newProductForm.value.provider_name,
        product_name: this.newProductForm.value.product_name,
        image: this.imageFile,
        quantity: this.newProductForm.value.quantity,
        price: this.newProductForm.value.price
      };

      this.productService.updateProduct(updatedProductDto).subscribe({
        next: (res) => {
          Swal.close(); // Cerrar el spinner
          if (res.success) {
            this.loadProducts();
            this.newProductForm.reset();
            this.selectedImage = null;
            this.editMode = false; // Resetear el modo de edición
            Swal.fire('Éxito', 'Producto actualizado con éxito.', 'success');
          } else {
            Swal.fire('Error', res.message || 'Ocurrió un error al actualizar el producto', 'error');
          }
        },
        error: (err) => {
          Swal.close(); // Cerrar el spinner
          Swal.fire('Error', 'No se pudo actualizar el producto => ' + err.message, 'error');
        }
      });
    }
  }

  deleteProduct(id: number) {
    // Mostrar spinner de carga con Swal
    Swal.fire({
      title: 'Eliminando producto...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        Swal.close(); // Cerrar el spinner
        if (res.success) {
          this.loadProducts();
          Swal.fire('Éxito', 'Producto eliminado con éxito.', 'success');
        } else {
          Swal.fire('Error', res.message || 'Ocurrió un error al eliminar el producto', 'error');
        }
      },
      error: (err) => {
        Swal.close(); // Cerrar el spinner
        Swal.fire('Error', 'No se pudo eliminar el producto => ' + err.message, 'error');
      }
    });
  }



  editProduct(product: any) {
    this.editMode = true;
    this.currentProductId = product.id; // Guardar el ID del producto
    this.newProductForm.patchValue({
      provider_name: product.provider_name,
      product_name: product.product_name,
      quantity: product.quantity,
      price: product.price
    });

  }

    // Convierte el archivo de imagen a Base64 y lo guarda
    onFileSelect(event: any) {
      const file = event.target.files[0];
      this.selectedImageName = file.name; // Obtener el nombre del archivo

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Asignar la imagen como Base64
        this.imageFile = this.selectedImage; // Guardar el archivo como Base64 para enviarlo al backend
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }

  resetForm() {
    this.newProductForm.reset(); // Resetear el formulario
    this.selectedImage = null; // Limpiar la imagen seleccionada
    this.selectedImageName = ''; // Limpiar el nombre de la imagen
    this.editMode = false; // Cambiar a modo de agregar en lugar de editar
    this.currentProductId = null; // Limpiar el ID del producto actual
  }

}
