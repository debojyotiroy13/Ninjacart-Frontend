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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NewListComponent } from './views/buyer/buyer.component.new';
import { NgxMasonryModule } from 'ngx-masonry';
import { CrystalGalleryModule} from 'ngx-crystal-gallery';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ListComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    ProductDetailsComponent,
    CartComponent,
    NewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxMasonryModule,
    CrystalGalleryModule
  ],
  providers: [RestService, AuthService, SellerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);