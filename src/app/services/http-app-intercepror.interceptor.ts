import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoaderService} from "./loader.service";

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {

  constructor(
    private appStateService : AppStateService,
    private loadService : LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadService.showLoading();
    let token="";
    console.log(request.url);
    if(request.url.includes("openai")){
      token=this.appStateService.authState.openaiKey;
    }else {
      token=this.appStateService.authState.token;
    }
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq).pipe(
      finalize(()=>{
        this.loadService.hideLoading();
      })
    );
  }
}
