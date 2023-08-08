import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingInterceptorInterceptor implements HttpInterceptor {

  constructor(private loggingService: LoggingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse)=>{
        this.loggingService.log(`${err.error.message}`);
        return of(new HttpResponse({body:{message:err.error.message}}));
      })
    )
  }
}
