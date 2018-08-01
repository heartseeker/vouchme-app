import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialService } from '../../../shared/service/social.service';


@Component({
  selector: 'app-social-edit',
  templateUrl: './social-edit.component.html',
  styleUrls: ['./social-edit.component.scss']
})
export class SocialEditComponent implements OnInit {

  form: FormGroup;
  modal = false;
  social;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private socialService: SocialService
  ) { }

  ngOnInit() {
    /* tslint:disable */
    const urlRegex = '^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$';
    /* tslint:enable */

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.pattern(urlRegex)]],
    });

    this.route.params.subscribe(param => {
      if (param['alias']) {
        const id = param['alias'];
        this.edit = true;
        this.socialService.getSocial(id)
          .take(1)
          .subscribe(social => {
            this.form.controls['name'].setValue(social['name']);
            this.form.controls['url'].setValue(social['url']);
          });
      }
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
