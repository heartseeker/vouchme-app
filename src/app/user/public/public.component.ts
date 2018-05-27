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
  verify;

  constructor(
    private route: Router,
    private activated: ActivatedRoute,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    const alias = this.activated.snapshot.params['alias'];

    this.http.get(`users/${alias}`).take(1)
    .switchMap(user => {
      if (user) {
        this.user = user;
        this.socials = user['social'];
        this.transactions$ = this.http.get('transactions/social?to=' + user['_id']);
        return this.http.post('vouches/verify', { to: this.user._id });
      }
    })
    .subscribe(res => {
      this.verify = res['status'];
    });
  }

  findSocial(name) {
    const social = this.user['social'];
    return social.find((s) => {
      return s['name'] === name;
    });
  }

  vouch() {
    this.http.post('vouches', { to: this.user._id }).subscribe(res => {
      this.verify = res['status'];
      this.getTransactions();
    }, (err) => {
      this.route.navigate(['user/login']);
    });
  }

}
