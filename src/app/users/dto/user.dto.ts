export interface UserRegisterDto {
  nombres: string;
  email: string;
  password: string;
}


export interface UserResponseDto {
  success: boolean;
  message: string;
  user?: UserRegisterDto
}

export interface UserRegisterDto {
  nombres: string;
  email: string;
  password: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserResponseLoginDto {
  success: boolean;
  message: string;
  token?: string;
  user?: UserLoginDto
}

export interface UserDto {
  nombres: string;
  email: string;
  rol?: number | string;
}

export interface UserResponseInfoDto {
  success: boolean;
  message: string;
  data: UserDto[]
}

export interface UserRolesDto {
  id_rol: number;
  descripcion: string;

}

export interface UserRolesResponseDto {
  success: boolean;
  message: string;
  data: UserRolesDto[]
}

