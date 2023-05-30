import {Component, OnInit} from '@angular/core';
import {ProductsRepositoryService} from "../services/products.repository.service";
import {AppStateService} from "../services/app-state.service";
import {query} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  query: string="";
  constructor(public productsRepositoryService:ProductsRepositoryService,
              public appState: AppStateService,
              private router:Router) {
  }
  ngOnInit() {
    this.getProducts({});
  }
  getProducts({
    keyword=this.appState.productsState.keyword,
                page=this.appState.productsState.currentPage,
                size=this.appState.productsState.pageSize}){
    this.appState.productsState.status="LOADING";
    setTimeout(()=>{
      this.productsRepositoryService.getProducts(keyword,page, size).subscribe({
        next : (resp)=>{
          let products=resp.body;
          let totalCount:number=parseInt(resp.headers.get("x-total-count")!);
          let totalPages=Math.floor(totalCount/this.appState.productsState.pageSize);
          if(totalCount % this.appState.productsState.pageSize!==0) ++this.appState.productsState.totalPages;
          this.appState.setProductState({
            products, totalPages,currentPage:page,
            totalCount, keyword, status:"LOADED", errorMessage:""
          })


        },
        error : (err)=>{
          this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
        }
      });
    },1000);
  }
  goToPage(page: number) {
    this.getProducts({page:page});
  }

  handleCheckProduct(product: any) {
    this.appState.productsState.status="LOADING";
    this.productsRepositoryService.checkProduct(product)
      .subscribe({
        next : (data)=>{
          let prods = this.appState.productsState.products.map((p:any)=>p.id===product.id?data:p);
          this.appState.setProductState({products:prods,status:"LOADED", errorMessage:""});
        },
        error : (err)=>{
          this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
        }
      })

  }

  handleDeleteProduct(product: any) {
    this.appState.productsState.status="LOADING";
    this.productsRepositoryService.deleteProduct(product)
      .subscribe({
        next :(data)=>{
          let products = this.appState.productsState.products.filter((p:any)=>p.id!==product.id);
          if(products.length==0 ){
            --this.appState.productsState.currentPage;
            if(this.appState.productsState.currentPage==0){
              this.appState.productsState.currentPage=1;
            }
            this.getProducts({})
          } else{
            let totalCount=this.appState.productsState.totalCount-1;
            this.appState.setProductState({products, totalCount,status:"LOADED", errorMessage:""});
          }
        },
        error : (err)=>{
          this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
        }
      })
  }

  handleSearch() {
    this.getProducts({keyword:this.query, page :1})
  }

  handleEditProduct(product: any) {
    this.router.navigateByUrl(`/catalog/editProduct/${product.id}`);
  }
}
