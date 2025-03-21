import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserLoginDto } from '../../../users/dto/user.dto';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';
  hidePassword = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  login(): void {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Formulario inválido', 'error');
      return;
    }

    const { email, password } = this.loginForm.value as UserLoginDto;

    this.userService.loginUser({ email, password }).subscribe({
      next: (res) => {
        console.log(res)
        if (res.success && res.token) {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          // Swal.fire('Bienvenido', res.message, 'success').then(() => {
          //   this.router.navigate(['/home']);
          // });
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Error', res.message, 'error');
        }
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo iniciar sesión => ' + err.message, 'error');
      },
    });
  }


  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
