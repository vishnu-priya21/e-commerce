import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
showDropdown: boolean = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    // ✅ Clear session or local storage
    sessionStorage.clear();
    localStorage.clear();

    // ✅ Redirect to login
    this.router.navigate(['/login']);
}
}
