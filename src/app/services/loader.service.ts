import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading$=new Subject<boolean>()

  constructor() { }

  public  showLoading():void {
    this.isLoading$.next(true);
  }
  public  hideLoading():void {
    this.isLoading$.next(false);
  }
}
