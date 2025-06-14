import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent  {
   orders: Order[] = [];
  errorMessage = '';
  userId = Number(sessionStorage.getItem('userId') ?? 0);


  constructor(private orderService: OrderService , private router: Router) {}
dropdownOpen = false;
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
goToPayments() {

    this.router.navigate(['/payments']); // fallback
  
}
goTodeliveries() {

    this.router.navigate(['/deliveries']); // fallback
  
}
logout() {
  // Clear local/session storage or tokens if needed
  this.router.navigate(['/login']);
}
ngOnInit(): void {
    this.fetchOrders();  
  }
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}
  fetchOrders() {
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => this.errorMessage = err.error?.error || 'Error fetching orders'
    });
  }

  createOrder() {
    this.orderService.createOrder(this.userId).subscribe({
      next: (order) => {
        this.orders.push(order);
        this.errorMessage = '';
      },
      error: (err) => this.errorMessage = err.error?.error || 'Error creating order'
    });
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o.orderId !== orderId);
        this.errorMessage = '';
      },
      error: (err) => this.errorMessage = err.error?.error || 'Error deleting order'
    });
  }
}
