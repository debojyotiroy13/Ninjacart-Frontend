import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './views/seller/product.component'
import { ListComponent } from './views/buyer/buyer.component'
import { AdminComponent } from './views/admin/admin.component'
import { LoginComponent } from './views/login/login.component'
import { SignupComponent } from './views/login/signup.component'
import { ProductDetailsComponent } from './views/buyer/product.details.component'
import { AuthGuard } from './auth.guard';
import { CartComponent } from './views/buyer/cart.component';

const routes: Routes = [
  { path: 'sell', component: ProductComponent , canActivate:[]},
  { path: 'cart', component: CartComponent , canActivate:[]},
  { path: 'home', component: ListComponent },
  { path: 'admin', component: AdminComponent , canActivate:[]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: '**', component: LoginComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:true}) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}



