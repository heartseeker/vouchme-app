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
    const profile = localStorage.getItem('profile');

    if (!profile) {
      return false;
    }

    const token = JSON.parse(profile).token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const isExpired = helper.isTokenExpired(token);

    return !isExpired;
  }

}
