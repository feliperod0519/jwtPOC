import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from '../models/Person';
import { AuthenicationToken } from '../models/AuthenicationToken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private personBSubject: BehaviorSubject<Person>;
  private id=1;

  constructor(private router:Router,private http:HttpClient) { 
    this.personBSubject = new BehaviorSubject({id:0,email:'deez.nuts@hotmale.ca',bio:'dummy user'});
  }

  public getLoggedUser():Observable<Person|null>{
    return this.personBSubject.asObservable();
  }

  public setLoggedUser(p:Person){
    this.personBSubject.next(p);
  }

  getIdFromEmail(email:string):number{
    this.http.get<Person>('http://localhost:8000/api/people/email/' + email).subscribe(x=>{
      console.log(x);
      this.id=x.id;
    });
    return this.id;    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  public login(email:string,password:string){
    this.http.post<any>('http://localhost:8000/api/authenticate',{"email":email,"password":password}).pipe(
       map(x=>{return x}),
       catchError(this.handleError)
     ).subscribe(x=>{
                      localStorage.setItem('jwtFelipe',JSON.stringify(x));
                      this.setLoggedUser(x as Person);
                    });
  }

  public logout(){
    localStorage.removeItem('jwtFelipe');
    this.setLoggedUser({id:0,email:'deez.nuts@hotmale.ca',bio:'dummy user'});
    this.router.navigate(['login']);
  }
}
