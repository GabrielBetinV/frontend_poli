import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto, UserRolesDto } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Formulario reactivo
  userForm: FormGroup;

  // Lista de usuarios para asignar roles (esto puede venir de un servicio o API)
  users: UserDto[] = [];

  // Lista de roles
  roles: UserRolesDto[] = [];

  selectedUser: UserDto = {
    nombres: '',
    email: ''
  }; // Usuario seleccionado para edición

  constructor(private fb: FormBuilder, private userService: UserService) {

    // Inicialización del formulario
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.getRoles();
    this.getUser();

  }

  // Actualiza el rol del usuario
  updateUser(): void {
    if (this.userForm.valid) {
      const { name, email, role } = this.userForm.value;

      // Mostrar spinner de carga con Swal
      Swal.fire({
        title: 'Actualizando...',
        text: 'Por favor espera un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Llamar al servicio para actualizar el rol del usuario
      this.userService.updateUserRole(email, role).subscribe({
        next: (res) => {
          Swal.close(); // Cerrar el spinner
          if (res.success) {
            Swal.fire('Éxito', 'Rol actualizado correctamente.', 'success');
            this.users = res.data
          } else {
            Swal.fire('Error', res.message, 'error');
          }
        },
        error: (err) => {
          Swal.close(); // Cerrar el spinner
          Swal.fire('Error', 'No se pudo actualizar el rol del usuario => ' + err.message, 'error');
        }
      });

      this.userForm.reset(); // Limpiar el formulario después de la actualización
    }
  }


  // Selecciona un usuario para editar
  editUser(user: UserDto): void {
    this.selectedUser = { ...user };

    // Establecer el rol correcto en el formulario
    const selectedRole = this.roles.find(role => role.descripcion === user.rol);
    console.log(this.roles);
    console.log(selectedRole);

    this.userForm.setValue({
      name: user.nombres,
      email: user.email,
      role: selectedRole ? selectedRole.id_rol : ''
    });
  }

  getUser(): void {


    // Mostrar spinner de carga con Swal
    Swal.fire({
      title: 'Actualizando...',
      text: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.userService.getUsers().subscribe({
      next: (res) => {
        Swal.close(); // Cerrar el spinner
        if (res.success) {
          this.users = res.data;
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      error: (err) => {
        Swal.close(); // Cerrar el spinner
        Swal.fire('Error', 'No se pudo obtener los usuarios => ' + err.message, 'error');
      },
    });
  }

  getRoles(): void {
    this.userService.getRoles().subscribe({
      next: (res) => {
        if (res.success) {
          this.roles = res.data;
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo obtener los usuarios => ' + err.message, 'error');
      },
    });
  }
}
