import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductDto, ProductsResponseDto, UpdateInventoryDto, UpdateProductDto } from '../dto/products.dto';
import { ContactFormDto } from '../dto/correo.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'https://api.mariachipasionmexicana.com/usuarios/index.php'; // Ruta del archivo


  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductsResponseDto> {
    const endpoint = `${this.apiUrl}?endpoint=products`;
    return this.http.get<ProductsResponseDto>(endpoint);
  }


  createProduct(product: CreateProductDto): Observable<ProductsResponseDto> {
    const endpoint = `${this.apiUrl}?endpoint=products`;
    return this.http.post<ProductsResponseDto>(endpoint, product);
  }

  updateProduct(product: UpdateProductDto): Observable<ProductsResponseDto> {
    const endpoint = `${this.apiUrl}?endpoint=products`;
    return this.http.put<ProductsResponseDto>(endpoint, product);
  }
  deleteProduct(id: number): Observable<ProductsResponseDto> {
    const endpoint = `${this.apiUrl}?endpoint=products`;
    return this.http.delete<ProductsResponseDto>(endpoint, { body: { id } });
  }


  // Actualizar la cantidad de inventario (solo administrador)
  updateInventory(id: number, quantity: number): Observable<any> {
    const productData = { id, quantity };
    return this.http.put<any>(this.apiUrl, productData);
  }

  sendContactEmail(contactData: ContactFormDto): Observable<any> {
    const endpoint = `https://api.mariachipasionmexicana.com/usuarios/testmail.php`;  // Suponiendo que tu backend identifica este endpoint
    return this.http.post<any>(endpoint, contactData);
  }



}
