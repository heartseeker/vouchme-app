import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../../core/authenticate.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private route: Router,
    private authenticate: AuthenticateService
  ) {

  }

  canActivate() {
    if (this.authenticate.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['/user/login']);
    return false;
  }

}
