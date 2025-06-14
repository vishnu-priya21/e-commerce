import { Component, OnInit } from '@angular/core';
import { CartService, CartItemRequestDTO, CartDTO } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import {OrderService} from 'src/app/services/order.service';
import {PaymentService} from 'src/app/services/payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId = 1; // Example, you can make it dynamic
  cart: CartDTO | null = null;
  totalPrice: number = 0;
  productIdInput = '';
  quantityInput = '';

  constructor(
  private cartService: CartService,
  private orderService: OrderService,
  private paymentService: PaymentService,
  private router: Router
) {}
showDropdown: boolean = false;
createdOrder: any;
showOrderSection = false;
showPaymentSection = false;
payments: any[] = [];
paymentRequest = {
    orderId: 0,
    amount: 0,
    paymentType: 'CREDIT_CARD'
  };
  getStatusClass(status: string): string {
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'status-pending';
    case 'COMPLETED':
      return 'status-completed';
    case 'FAILED':
      return 'status-failed';
    default:
      return '';
  }
}

handleProceedToBuy() {
  this.orderService.createOrder(this.userId).subscribe({
    next: (order: any) => {
      this.createdOrder = order;
      this.paymentRequest.orderId = order.orderId;
      this.paymentRequest.amount = this.cart?.totalPrice ?? 0;
      this.showOrderSection = true;
    },
    error: (err: any) => {
      alert('Order creation failed: ' + (err.error?.error || 'Unknown error'));
    }
  });
}

togglePayment() {
  this.showPaymentSection = true;
}

processPayment() {
  this.paymentService.processPayment(this.paymentRequest).subscribe({
    next: (res: any) => {
      this.payments.push(res);
      alert('Payment successful!');
      this.clearCart();
      this.router.navigate(['/orders']);
    },
    error: (err: any) => {
      alert('Payment failed: ' + (err.error?.error || 'Unknown error'));
    }
  });
}
  ngOnInit() {
    this.loadCart();
  }
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
goToOrders() {
  
    this.router.navigate(['/orders']); // fallback
  
}
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

logout() {
  sessionStorage.clear();
  localStorage.clear();
  this.router.navigate(['/login']);
}

  loadCart() {
    this.cartService.getCart(this.userId).subscribe({
      next: (data) => {
        this.cart = data;
        this.fetchTotalPrice();
      },
      error: (err) => console.error(err)
    });
  }

  addItem() {
    const request: CartItemRequestDTO = {
      productId: parseInt(this.productIdInput),
      quantity: parseInt(this.quantityInput)
    };

    this.cartService.addToCart(this.userId, request).subscribe({
      next: (data) => {
        this.cart = data;
        this.fetchTotalPrice();
        this.productIdInput = '';
        this.quantityInput = '';
      },
      error: (err) => console.error(err)
    });
  }

  removeItem(productId: number) {
    this.cartService.removeItem(this.userId, productId).subscribe({
      next: (data) => {
        this.cart = data;
        this.fetchTotalPrice();
      },
      error: (err) => console.error(err)
    });
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe({
      next: (data) => {
        this.cart = data;
        this.totalPrice = 0;
      },
      error: (err) => console.error(err)
    });
  }

  fetchTotalPrice() {
    if (this.cart?.cartId) {
      this.cartService.getTotalPrice(this.cart.cartId).subscribe({
        next: (price) => this.totalPrice = price,
        error: (err) => console.error(err)
      });
    }
  }
}
