import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductsRepositoryService} from "../services/products.repository.service";
import {ActivatedRoute} from "@angular/router";
import {CustomerModalAlertComponent} from "../customer-modal-alert/customer-modal-alert.component";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  public productFormGroup!:FormGroup;
  public productId! : number;
  constructor(private fb:FormBuilder,
              private modalService: NgbModal,
              private activatedRoute:ActivatedRoute,
              private productsRepositoryService:ProductsRepositoryService,
              private appState : AppStateService) {
  }
  ngOnInit() {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.appState.productsState.status="LOADING";
    this.productsRepositoryService.getProductById(this.productId).subscribe({
      next :(data:any)=>{
        this.appState.setProductState({status:"LOADED", errorMessage:""});
        this.productFormGroup=this.fb.group({
          name : this.fb.control(data.name, [Validators.required, Validators.minLength(4)]),
          price : this.fb.control(data.price),
          checked : this.fb.control(data.checked)
        });
      },
      error : (err)=>{
        this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
      }
    })
  }

  getErrorMessage(name: string, errors: ValidationErrors):string {
    if(errors['required']){
      return name + " is Required";
    } else if (errors['minlength']){
      return name +" should have at least "+errors['minlength']['requiredLength']+" Characters";
    } else return "";
  }

  handleUpdateProduct() {
    let product=this.productFormGroup.value;
    this.appState.productsState.status="LOADING";
    this.productsRepositoryService.updateProduct(this.productId,product)
      .subscribe({
        next :(data)=>{
          this.appState.setProductState({status:"LOADED", errorMessage:""});
          let modalRef=this.modalService.open(CustomerModalAlertComponent);
          modalRef.componentInstance.title="Product updated successfully";
          modalRef.componentInstance.message=data;
        },
        error : (err)=>{
          this.appState.setProductState({status:"ERROR", errorMessage:err.statusText});
        }
      })
  }
}
