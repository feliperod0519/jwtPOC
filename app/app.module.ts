import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpPersonInterceptorInterceptor } from '../interceptors/http-person-interceptor.interceptor';
import { LoggingService } from '../services/logging.service';
import { ConsoleLoggingService } from '../services/console-logging.service';
import { ErrorInterceptor } from '../interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [//{provide: HTTP_INTERCEPTORS, useClass:HttpPersonInterceptorInterceptor},
              {provide: LoggingService, useClass: ConsoleLoggingService},
              {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
