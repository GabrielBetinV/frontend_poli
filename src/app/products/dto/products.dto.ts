export interface ProductDto {
  id: number;
  provider_name: string;
  product_name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface ProductsResponseDto {
  success: boolean;
  message: string;
  data?: ProductDto[];
}

export interface CreateProductDto {
  provider_name: string;
  product_name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface UpdateProductDto {
  id: number;
  quantity?: number;
  price?: number;
}

export interface UpdateInventoryDto {
  id: number;
  quantity: number;

}



