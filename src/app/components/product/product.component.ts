import { Component } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  
  newProduct: Product = {
  productName: '',
  productDescription: '',
  productPrice: 0,
  stockQuantity: 0,
  expiryDate: '',
  manufactureDate: ''
};

  fetchId!: number;
  fetchedProduct!: Product;

  constructor(private productService: ProductService , private router: Router) {}
showDropdown: boolean = false;
isEditMode = false;
originalProduct: any = null;
allProducts: Product[] = [];
showAllProductsModal = false;
goToDashboard() {
  this.router.navigate(['/admin']); // or your correct route path
}
toggleAllProductsModal() {
  this.showAllProductsModal = !this.showAllProductsModal;
  if (this.showAllProductsModal) {
    this.productService.viewAllProducts().subscribe({
      next: (products) => this.allProducts = products,
      error: () => console.error('Failed to load products')
    });
  }
}
enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.fetchedProduct = structuredClone(this.originalProduct);
    this.isEditMode = false;
  }

  updateProduct() {
    const id = this.fetchedProduct.productId;
    const payload = { ...this.fetchedProduct };
    delete payload.productId; // ensure ID is not sent in body

    this.productService.updateProduct(this.fetchedProduct.productId!, payload).subscribe({
      next: (updated) => {
        alert('✅ Product updated successfully!');
        this.fetchedProduct = updated;
        this.originalProduct = structuredClone(updated);
        this.isEditMode = false;
      },
      error: () => {
        alert("❌ Failed to update product.");
      }
    });
  }
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

logout() {
  sessionStorage.clear();
  localStorage.clear();
  this.router.navigate(['/login']);
}
deleteProduct() {
  if (confirm("Are you sure you want to delete this product?")) {
    this.productService.deleteProductById(this.fetchedProduct.productId!).subscribe({
      next: () => {
        alert("🗑️ Product deleted successfully.");
        window.location.reload();
      },
      error: () => {
        alert("❌ Failed to delete the product.");
      }
    });
  }
}
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      (data) => {
        alert('Product added with ID: ' + data.productId);
        this.newProduct = {
  productName: '',
  productDescription: '',
  productPrice: 0,
  stockQuantity: 0,
  expiryDate: '',
  manufactureDate: ''
};

      },
      (error) => {
        alert('Error adding product');
        console.error(error);
      }
    );
  }

  getProductById() {
    this.productService.getProductById(this.fetchId).subscribe(
      (data) => this.fetchedProduct = data,
      (error) => alert('Product not found')
    );
  }
  
}
