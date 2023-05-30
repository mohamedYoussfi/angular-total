import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent {

 constructor(public appState:AppStateService) {
 }

  totalCheckedProducts() {
    return this.appState.productsState.products.filter((p:any)=>p.checked==true).length
  }
}
