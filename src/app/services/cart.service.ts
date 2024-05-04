import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  addToCart(item: any) {
    const currentCart = this.cartItems.value;
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      this.cartItems.next(currentCart);
    } else {
      this.cartItems.next([...currentCart, { ...item, quantity: 1 }]);
    }
  }

  updateCartItemQuantity(productId: number, newQuantity: number) {
    const currentCart = this.cartItems.value;
    const itemToUpdate = currentCart.find(item => item.id === productId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.cartItems.next(currentCart);
    }
  }

  removeCartItem(productId: number) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cartItems.next(updatedCart);
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }
}
