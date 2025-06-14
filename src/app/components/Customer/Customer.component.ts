import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService, CartItemRequestDTO } from 'src/app/services/cart.service';
@Component({
  selector: 'app-customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.scss']
})
export class CustomerComponent {
showDropdown: boolean = false;
 products: any[] = [];
  showProductModal = false;
  constructor(private router: Router,private productService: ProductService, private cartService: CartService) {}
ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.viewAllProducts().subscribe(res => {
      console.log('Products:', res);
      this.products = res.map(p => ({ ...p, quantity: 1 }));
    });
  }

  openProductModal() {
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  addToCart(product: any) {
    const userId = Number(sessionStorage.getItem('userId'));
    const item: CartItemRequestDTO = {
      productId: product.productId,
      quantity: product.quantity || 1
    };

    this.cartService.addToCart(userId, item).subscribe({
      next: () => alert('Added to cart!'),
      error: () => alert('Error adding to cart.')
    });
  }
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
