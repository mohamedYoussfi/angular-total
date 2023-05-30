import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private appState : AppStateService, private router : Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authorized=false;
    if(this.appState.authState.isAuthenticated==false){
      authorized=false;
    } else {
      for (let role of this.appState.authState.roles){
        if((route.data['roles'] as Array<string>).includes(role)){
          authorized=true;
          break;
        }
      }
    }
    if(authorized) {
      return true;
    } else {
      this.router.navigateByUrl("/notAuthorized");
      return false;
    }
  }

}
