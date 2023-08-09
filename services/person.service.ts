import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Person } from '../models/Person'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]>{
    return this.http.get<Person[]>("http://localhost:8000/api/people");
  }

  getPerson(id:number):Observable<Person>{
    return this.http.get<Person[]>("http://localhost:8000/api/people").pipe(
            map(people=>people.find(x=>x.id===id) as Person)
    );
  }

  //Just an exercise
  getPersonByEmail(email:string):Observable<Person>{
    return this.http.get<Person>("http://localhost:8000/api/people/email/"+email).pipe(
            map(x=>x)
    );
  }

  validate(id:number,password:string)
}
