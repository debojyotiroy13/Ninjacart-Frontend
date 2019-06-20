import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './views/seller/product.component';
import { ListComponent } from './views/buyer/buyer.component';
import { AdminComponent } from './views/admin/admin.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/login/signup.component'
import { ProductDetailsComponent } from './views/buyer/product.details.component'

import { FormsModule } from '@angular/forms';
import { FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule} from '@angular/common/http';
import { RestService} from './app.service';
import { AuthService} from './services/auth.service';
import { SellerService} from './services/seller.service';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './views/buyer/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ListComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    ProductDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [RestService, AuthService, SellerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
