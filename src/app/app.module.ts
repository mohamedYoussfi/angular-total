import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { DashBoardComponent } from './dash-board/dash-board.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomerModalAlertComponent } from './customer-modal-alert/customer-modal-alert.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { HttpAppInterceptor} from "./services/http-app-intercepror.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    DashBoardComponent,
    EditProductComponent,
    LoginComponent,
    CatalogComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
