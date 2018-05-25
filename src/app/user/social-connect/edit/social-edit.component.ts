import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-social-edit',
  templateUrl: './social-edit.component.html',
  styleUrls: ['./social-edit.component.scss']
})
export class SocialEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    /* tslint:disable */
    const urlRegex = '^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$';
    /* tslint:enable */

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.pattern(urlRegex)]],
    });

  }

  update() {
    const data = {
      name: this.form.get('name').value,
      url: this.form.get('url').value
    };

    this.http.post('users/social', data).subscribe((res) => {
      localStorage.setItem('profile', JSON.stringify(res));
      this.router.navigate(['/user/connections']);
    });
  }

}
