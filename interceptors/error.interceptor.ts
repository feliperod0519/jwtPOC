import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { noop, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  

  constructor(private loggingService: LoggingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> {
    // const newHeaders = new HttpHeaders({
    //   "Content-Type":"application/json"
    //    });
    // //clone request and change header
    // let clone = request.clone( { headers: newHeaders } );
    // return next.handle(clone);
    return next.handle(request).pipe(
      catchError((e:HttpErrorResponse)=>{
        this.loggingService.log(`${e.error.message}`);
        return throwError(e);
      })
    )
  }


}
