import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  // Modal-related states
  showModal = false;
  name = '';
  regEmail = '';
  regPassword = '';
  role = '';
  regErrorMessage = '';
  regSuccessMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

 login() {
  this.authService.login(this.email, this.password).subscribe({
    next: (res: any) => {
      console.log('Login response:', res); // ✅ You confirmed this is a proper object

      const token = res.token;
      const userId = res.userId;
      const redirectPath = res.redirect;

      if (token && userId) {
        this.authService.saveToken(token);
        this.authService.saveUserId(userId);
        this.authService.saveUserRole(redirectPath);
        this.router.navigateByUrl(redirectPath);
      } else {
        this.errorMessage = 'Unexpected login response format.';
      }
    },
    error: () => {
      this.errorMessage = 'Invalid login credentials';
    }
  });
}



  openRegisterModal(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }

  closeRegisterModal() {
    this.showModal = false;
    this.regErrorMessage = '';
    this.regSuccessMessage = '';
  }

  register() {
  const userData = {
    name: this.name,
    email: this.regEmail,
    password: this.regPassword,
    role: this.role
  };

  this.authService.register(userData).subscribe({
  next: (res: string) => {
    this.regSuccessMessage = res;
    this.regErrorMessage = '';
    setTimeout(() => this.closeRegisterModal(), 1500);
  },
  error: () => {
    this.regErrorMessage = 'Registration failed. Try again.';
    this.regSuccessMessage = '';
  }
});
}
}
