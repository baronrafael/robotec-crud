import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){}
  
  canActivate(){
    if(localStorage.getItem('userLogged')){
      this.router.navigate(['pages'], { replaceUrl: true });
      return false;
    }
    else{
      return true;
    }
    
  }
  
}
