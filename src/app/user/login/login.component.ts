import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentYear = (new Date()).getFullYear();
  form: FormGroup;
  request = false;
  err;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('profile')) {
      this.route.navigate(['/user/profile']);
    }

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;

    const payload = {
      username,
      password
    };
    this.request = true;
    this.http.post('auth', payload)
    .subscribe((res) => {
      this.request = false;
      const helper = new JwtHelperService();
      localStorage.setItem('token', res['token']);
      this.route.navigate(['user/profile']);
    }, (err) => {
      console.log(err);
      this.err = err.error;
      this.request = false;
    });
  }

}
