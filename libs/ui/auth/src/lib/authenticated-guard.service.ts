import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.isAuthenticated();
  }

  canActivate() {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    return this.authService.loggedIn;
  }
}
