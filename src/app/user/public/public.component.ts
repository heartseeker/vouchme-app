import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import 'rxjs/add/operator/take';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  user = null;
  path = environment.api_url;
  socials: any = {};
  transactions$;

  constructor(
    private route: Router,
    private activated: ActivatedRoute,
    private http: ApiService
  ) { }

  ngOnInit() {
    const alias = this.activated.snapshot.params['alias'];

    this.http.get(`users/${alias}`).take(1).subscribe(user => {
      if (user) {
        this.user = user;
        this.socials = user['social'];
      }
    });

    this.transactions$ = this.http.get('transactions/social');

  }

  findSocial(name) {
    const social = this.user['social'];
    return social.find((s) => {
      return s['name'] === name;
    });
  }

}
