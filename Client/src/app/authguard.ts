import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from 'src/core/models/user.model';
import { AuthService } from 'src/core/services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class adminControl implements CanActivate {
  user: User | null;
  constructor(private authService: AuthService, private router: Router) {
    this.user = null;
    this.authService.currentUser.subscribe((u) => {
      this.user = u;
    });
  }

  canActivate(): boolean {
    if (this.authService.IsLoggedIn && this.authService.getUserType() === 0) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class userControl implements CanActivate {
  user: User | null;
  constructor(private authService: AuthService, private router: Router) {
    this.user = null;
    this.authService.currentUser.subscribe((u) => {
      this.user = u;
    });
  }

  canActivate(): boolean {
    if (this.authService.IsLoggedIn && this.authService.getUserType() === 1) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
@Injectable({
  providedIn: 'root',
})
export class employeeControl implements CanActivate {
  user: User | null;
  constructor(private authService: AuthService, private router: Router) {
    this.user = null;
    this.authService.currentUser.subscribe((u) => {
      this.user = u;
    });
  }

  canActivate(): boolean {
    if (this.authService.IsLoggedIn && this.authService.getUserType() === 2) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
