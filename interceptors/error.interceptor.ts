import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const newHeaders = new HttpHeaders({
    //   "Content-Type":"application/json"
    //    });
    // //clone request and change header
    // let clone = request.clone( { headers: newHeaders } );
    // return next.handle(clone);
  }
}
