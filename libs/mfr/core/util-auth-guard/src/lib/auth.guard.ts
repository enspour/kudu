import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@kudu/mfr-data-access-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public canActivate(): boolean {
    if (this.authService.auth()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
