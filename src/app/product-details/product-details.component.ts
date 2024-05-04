import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountPipe } from '../pipes/discount.pipe';
import { ProductsRequestService } from '../services/products-request.service';
import { CounterService } from '../services/counter.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DiscountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  counter = 0;
  cartItems: any[] = [];
  productDetails: any;
  @Input() cart: any[] = [];
  @Input() id: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsRequestsService: ProductsRequestService,
    private counterService: CounterService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productsRequestsService
      .getProductDetails(this.id)
      .subscribe((res) => (this.productDetails = res));

    this.counterService
      .getCounterVal()
      .subscribe((res: any) => (this.counter = res));

    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
  handleUpdateQuantity(productId: number, newQuantity: number) {
    const itemToUpdate = this.cartItems.find(item => item.id === productId);
    console.log(itemToUpdate.quantity);
    if (itemToUpdate) {
      newQuantity = itemToUpdate.quantity + newQuantity;
      const originalProduct = this.cartItems.find(product => product.id === productId);
      if (originalProduct) {
        originalProduct.stock -= (itemToUpdate.quantity - newQuantity);
      }

      this.cartService.updateCartItemQuantity(productId, newQuantity);
    }
  }

  addToCart(productId: number) {
    this.counterService.addToCart(this.productDetails);
    this.cartService.addToCart(this.productDetails);
    console.log(`Product ${productId} added to cart.`);
  }
  isInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }
  isProductInWishlist(productId: number): boolean {
    return false;
  }

  getItemQuantity(productId: number): number {
    const item = this.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }

  getStars(rating: number): number[] {
    const starsCount = Math.round(rating);
    return Array(starsCount).fill(1);
  }


  calculateMonthlyPayment(price: number, months: number): number {
    return price / months;
  }

}

