import { Component, OnInit } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'POC-jwt';

  constructor(private authService:AuthenticationService){}

  ngOnInit(){
      //throwError('Minou es el gato').subscribe(v=>v); //Interceptor utilization
      //this.testSubject();
      //console.log('-----');
      //this.testBehaviorSubject();
      this.authService.login('minou@cat-tv.ca','hello');
      //this.authService.logout();
  }

  testSubject()
  {
    const subject = new Subject();
    const series$ = subject.asObservable();
    series$.subscribe(x=>console.log(x));
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.complete();
  }

  testBehaviorSubject()
  {
    const bSubject = new BehaviorSubject(0);
    const series$ = bSubject.asObservable();
    series$.subscribe(x=>console.log("Early->" + x));
    bSubject.next(1);
    bSubject.next(2);
    bSubject.next(3);
    setTimeout(()=>{
                      series$.subscribe(x=>console.log("Late->" + x));
                      bSubject.next(4);
                   },2000);
  }

}
