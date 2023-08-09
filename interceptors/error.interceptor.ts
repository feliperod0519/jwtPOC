import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { noop, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService,private authService:AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const newHeaders = new HttpHeaders({
    //   "Content-Type":"application/json"
    //    });
    // //clone request and change header
    // let clone = request.clone( { headers: newHeaders } );
    // return next.handle(clone);
    return next.handle(request).pipe(
      catchError((e:HttpErrorResponse)=>{
        if ([401, 403].includes(e.status)) {
          this.authService.logout();
        }
        this.loggingService.log(`${e.error.message || e.statusText}`);
        return throwError(e);
      })
    )
  }


}
