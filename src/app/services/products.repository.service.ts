import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  host :string ="http://localhost:9000";

  constructor(private http:HttpClient) { }

  getProducts(keyword:string, page:number, size:number) {
      return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  }
  checkProduct(product:any){
    return this.http.patch(`${this.host}/products/${product.id}`,{checked:!product.checked});
  }
  deleteProduct(product:any){
    return this.http.delete(`${this.host}/products/${product.id}`);
  }
  saveProduct(product:any){
    return this.http.post(`${this.host}/products`,product);
  }
  getProductById(id:number){
    return this.http.get(`${this.host}/products/${id}`);
  }
  updateProduct(id:number, product:any){
    return this.http.put(`${this.host}/products/${id}`,product);
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
