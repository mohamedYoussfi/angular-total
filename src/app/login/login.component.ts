import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthRepositoryService} from "../services/auth.repository.service";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm! : FormGroup;
  constructor(private fb:FormBuilder,
              private authService : AuthRepositoryService,
              private router : Router,
              public appState : AppStateService) {
  }
  ngOnInit() {
    this.loginForm=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    });
  }

  handleLogin() {
    this.appState.setAuthState({status:"LOADING"})
    this.authService.login(this.loginForm.value.username,this.loginForm.value.password)
      .then((data)=>{
        this.appState.setAuthState({status:"SUCCESS", errorMessage :""})
        this.router.navigateByUrl("/home");
      }).catch((err)=>{
        this.appState.setAuthState({errorMessage : err, status : "ERROR"})
    })

  }
}
