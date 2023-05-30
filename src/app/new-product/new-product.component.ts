import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerModalAlertComponent} from "../customer-modal-alert/customer-modal-alert.component";
import {ProductsRepositoryService} from "../services/products.repository.service";
import {AppStateService} from "../services/app-state.service";
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public productFormGroup!:FormGroup;
  constructor(private fb:FormBuilder,
              private modalService: NgbModal,
              private productsRepositoryService:ProductsRepositoryService,
              private appState : AppStateService) {
  }
  ngOnInit() {
    this.productFormGroup=this.fb.group({
      name : this.fb.control("", [Validators.required, Validators.minLength(4)]),
      price : this.fb.control(0),
      checked : this.fb.control(false)
    });
  }

  handleSaveProduct() {
    this.productsRepositoryService.saveProduct(this.productFormGroup.value)
      .subscribe({
        next :(data)=>{
          this.appState.setProductState({status:"LOADED", errorMessage:""});
          const modalRef = this.modalService.open(CustomerModalAlertComponent);
          modalRef.componentInstance.title = 'Product saved successfully';
          modalRef.componentInstance.message = data;
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

}
