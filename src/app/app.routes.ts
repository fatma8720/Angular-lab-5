import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FavComponent } from './fav/fav.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        title: 'Product List page',
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        title: 'Product details page',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login page',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register page',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart page',
      },
      {
        path: 'fav',
        component: FavComponent,
        title: 'Whishlist page',
      },
      {
        path: '**',
        component: NotFoundComponent,
        title: 'Not found page',
      },
];
