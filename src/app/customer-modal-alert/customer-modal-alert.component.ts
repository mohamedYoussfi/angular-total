import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JsonPipe} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-customer-modal-alert',
  templateUrl: './customer-modal-alert.component.html',
  imports: [
    JsonPipe
  ],
  styleUrls: ['./customer-modal-alert.component.css']
})
export class CustomerModalAlertComponent {
  @Input() title! :string;
  @Input() message! :string;
  constructor(public activeModal : NgbActiveModal) {
  }
}
