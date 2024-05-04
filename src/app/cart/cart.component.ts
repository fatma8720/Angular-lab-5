import { Component, OnInit } from '@angular/core';
import { CounterService } from '../services/counter.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports:[RouterLink,CommonModule],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartTotal: number = 0;
  tax: number = 0;
  grandTotal: number = 0;

  constructor(
    private counterService: CounterService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  removeItem(productId: number) {
    this.cartService.removeCartItem(productId);
    this.counterService.updateCounterVal(this.cartItems.length);
  }
  handleUpdateQuantity(productId: number, newQuantity: number) {
    const itemToUpdate = this.cartItems.find(item => item.id === productId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      const originalProduct = this.cartItems.find(product => product.id === productId);
      if (originalProduct) {
        originalProduct.stock -= (itemToUpdate.quantity - newQuantity);
      }

      this.cartService.updateCartItemQuantity(productId, newQuantity);

      this.calculateTotals();
    }
  }
  calculateTotals() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.tax = this.cartTotal * 0.1;
    this.grandTotal = this.cartTotal + this.tax;
  }
}
