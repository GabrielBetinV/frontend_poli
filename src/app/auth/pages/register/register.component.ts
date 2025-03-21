import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../users/services/user.service';
import { UserRegisterDto } from '../../../users/dto/user.dto';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }



  onSubmit(): void {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
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


    const userData: UserRegisterDto = this.registerForm.value;
    this.userService.registerUser(userData).subscribe({
      next: (res) => {
        Swal.close(); // Cerrar el spinner
        Swal.fire('Éxito', res.message, 'success').then(() => {
          this.registerForm.reset();
          this.router.navigate(['/auth/login']);
        });
      },
      error: (err) => {
        Swal.close(); // Cerrar el spinner
        Swal.fire('Error', 'No se pudo registrar => ' + err.message, 'error');
      },
    });
  }


}
