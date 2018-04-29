import { Injectable } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthenticateService {

  constructor(
    private authService: AuthService
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

}
