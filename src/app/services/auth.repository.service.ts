import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable, of, throwError} from "rxjs";
import jwtDecode from "jwt-decode";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {
  host :string ="http://localhost:9000";


  constructor(private http:HttpClient, private appState : AppStateService) { }

  async login(username:string, password:string) :Promise<any>  {
    try{
      let data:any = await firstValueFrom(this.http.get(`${this.host}/users/${username}`));
      if (data.password===btoa(password)){
        let token=data.token;
        let decodedJwt:any = jwtDecode(token);
        this.appState.setAuthState({
          isAuthenticated : true,
          username : username,
          roles : decodedJwt.roles,
          token :token
        })
        return Promise.resolve(true);
      } else {
        return Promise.reject("Bad Credentials");
      }
    } catch (e){
      return Promise.reject("Network error");
    }

  }
  public  logout(){
    this.appState.setAuthState({
      isAuthenticated : false,
      username :"",
      token :""
    })
  }
}
