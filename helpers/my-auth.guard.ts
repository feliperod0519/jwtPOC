import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyAuthGuard implements CanActivate {
  
  constructor(private router:Router, private authService:AuthenticationService){
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const user = 'felipeRod';
    if (user){
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{comingFrom:state.url}});
    return false;
  }
  
}
