import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { UserLoginDto, UserRegisterDto, UserResponseDto, UserResponseInfoDto, UserResponseLoginDto, UserRolesResponseDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dataUrl = 'https://api.mariachipasionmexicana.com/usuarios/index.php'; // Ruta del archivo

  constructor(private http: HttpClient) { }


  registerUser(user: UserRegisterDto): Observable<UserResponseDto> {
    const endpoint = `${this.dataUrl}?endpoint=register`;
    return this.http.post<UserResponseDto>(endpoint, user);
  }

  loginUser(user: UserLoginDto): Observable<UserResponseLoginDto> {
    const endpoint = `${this.dataUrl}?endpoint=login`;
    return this.http.post<UserResponseLoginDto>(endpoint, user);
  }

  // Obtener usuarios
  getUsers(): Observable<UserResponseInfoDto> {
    const endpoint = `${this.dataUrl}?endpoint=users`;
    return this.http.get<UserResponseInfoDto>(endpoint);
  }

  // Obtener roles
  getRoles(): Observable<UserRolesResponseDto> {
    const endpoint = `${this.dataUrl}?endpoint=roles`;
    return this.http.get<UserRolesResponseDto>(endpoint);
  }

  // Actualizar el rol de un usuario
  updateUserRole(email: string, id_rol: number): Observable<UserResponseInfoDto> {
    const endpoint = `${this.dataUrl}?endpoint=users`;
    return this.http.put<UserResponseInfoDto>(endpoint, { email, id_rol });
  }

}
