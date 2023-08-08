import { Injectable } from '@angular/core';
import { LoggingService } from '../services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggingService implements LoggingService {

  log(logMessage:string):void{
    console.log(logMessage);
  }
}
