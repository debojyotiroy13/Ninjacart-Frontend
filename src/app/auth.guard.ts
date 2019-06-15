import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{
    if(this.authService.getLoggedInState()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  // canActivate(
  //   if(this.)
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
