import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import 'rxjs/add/operator/take';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthenticateService {

  constructor(
    private authService: AuthService,
  ) { }

  loginFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  getFbUser() {
    this.authService.authState
      .subscribe(res => {
        if (res) {
          return true;
        }
        return false;
      });
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

}
