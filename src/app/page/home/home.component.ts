import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  modal = false;

  constructor(
    private fb: FormBuilder,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
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
