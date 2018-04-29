import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticateService } from '../../core/authenticate.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  modal = false;
  user;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private authService: AuthService,
    private auth: AuthenticateService
  ) { }

  ngOnInit() {
    this.user = this.auth.getFbUser();

    console.log('user', this.user);

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  signUp() {
    const first_name = this.form.controls['first_name'].value;
    const last_name = this.form.controls['last_name'].value;
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    const payload = {
      first_name,
      last_name,
      username: email,
      password
    };

    this.http.post('users', payload).subscribe(res => {
      this.modal = true;
    });
  }

  hideModal() {
    this.modal = false;
  }

}
