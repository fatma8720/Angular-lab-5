import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counter = new BehaviorSubject<Number>(0)
  private cartItems = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCounterVal(){
    return this.counter.asObservable();
  }

  updateCounterVal(newVal : number){
    this.counter.next(newVal)
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: any) {
    const currentCart = this.cartItems.value;
    currentCart.push(product);
    this.cartItems.next(currentCart);
    this.updateCounterVal(currentCart.length);
  }

  removeFromCart(productId: number) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cartItems.next(updatedCart);
    this.updateCounterVal(updatedCart.length);
  }
}
