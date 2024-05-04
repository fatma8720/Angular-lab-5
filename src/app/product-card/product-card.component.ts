import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DiscountPipe } from '../pipes/discount.pipe';
import { CounterService } from '../services/counter.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,CommonModule,DiscountPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() productItem: any;
  counter = 0;
  cartItems: any[] = [];

  constructor(private counterService: CounterService,private cartService:CartService) { }
  ngOnInit() {
     this.counterService
     .getCounterVal()
     .subscribe((res: any) => (this.counter = res));

     this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  addToCart(productId: number) {
    this.counterService.addToCart(this.productItem);
    this.cartService.addToCart(this.productItem);
    console.log(`Product ${productId} added to cart.`);
  }
  getStars(rating: number): number[] {
    const starsCount = Math.round(rating);
    return Array(starsCount).fill(1);
  }
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }
}
