import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AuthorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [
  {path : "home", component: HomeComponent},
  {
    path : "catalog",
    component:CatalogComponent,
    canActivate :[AuthenticationGuard],
    children :[
      {path : "products", component : ProductsComponent, canActivate :[AuthorizationGuard], data :{roles : ['USER']}},
      {path : "newProduct", component : NewProductComponent, canActivate :[AuthorizationGuard], data :{roles : ['ADMIN']}},
      {path : "editProduct/:id", component : EditProductComponent, canActivate :[AuthorizationGuard], data :{roles : ['ADMIN']}},
    ]
  },
  {path : "login", component : LoginComponent},
  {path : "notAuthorized", component : NotAuthorizedComponent, canActivate : [AuthenticationGuard]},
  {path : "", redirectTo : "login", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
