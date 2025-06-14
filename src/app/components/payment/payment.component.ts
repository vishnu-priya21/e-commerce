import { Component } from '@angular/core';
import { PaymentRequest, PaymentResponse, PaymentService } from 'src/app/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent {
  paymentRequest: PaymentRequest = {
    orderId: 1,
    amount: 500,
    paymentType: 'UPI'
  };

  payments: PaymentResponse[] = [];
  error = '';

  constructor(private paymentService: PaymentService, private router: Router) {}
  ngOnInit(): void {
  this.fetchAllPayments();
}

showDropdown: boolean = false;
goToDashboard() {
  const role = sessionStorage.getItem('role');

  if (role === '/customer') {
    this.router.navigate(['/customer']);
  } else if (role === '/admin') {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/login']); // fallback
  }
}
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

logout() {
  sessionStorage.clear();
  localStorage.clear();
  this.router.navigate(['/login']);
}

  processPayment() {
    this.paymentService.processPayment(this.paymentRequest).subscribe({
      next: (res) => {
        this.payments.push(res);
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.error || 'Error processing payment';
      }
    });
  }

  fetchAllPayments() {
    this.paymentService.getAllPayments().subscribe({
      next: (res) => this.payments = res,
      error: (err) => this.error = err.error?.error || 'Error fetching payments'
    });
  }

  fetchByStatus(status: string) {
    this.paymentService.getPaymentsByStatus(status).subscribe({
      next: (res) => this.payments = res,
      error: (err) => this.error = err.error?.error || 'Invalid status'
    });
  }

  fetchByType(type: string) {
    this.paymentService.getPaymentsByType(type).subscribe({
      next: (res) => this.payments = res,
      error: (err) => this.error = err.error?.error || 'Invalid payment type'
    });
  }
}
