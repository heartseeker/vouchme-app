import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentYear = (new Date()).getFullYear();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private route: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const username = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;

    const payload = {
      username,
      password
    };

    this.http.post('users/login', payload).subscribe(res => {
      this.route.navigate(['user/profile']);
    });
  }

}
