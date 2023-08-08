import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'POC-jwt';

  ngOnInit(){
      //throwError('Minou es el gato').subscribe(v=>v); //Interceptor utilization
  }

}
