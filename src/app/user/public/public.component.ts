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
  baseUrl = environment.api_base_url;
  socials: any = [];
  transactions$;
  verify;
  modal: boolean = false;
  identityModal: boolean = false;
  vouches$;
  userId;
  type: string = 'vouch';

  constructor(
    private route: Router,
    private activated: ActivatedRoute,
    private http: ApiService
  ) { }

  ngOnInit() {
    // this.userId = this.activated.snapshot.params['alias'];

    this.activated.params.subscribe(params => {
      this.userId = params['alias'];
      this.getUserData();
    });
  }

  showModal(type) {
    this.type = type;
    this.modal = true;
  }

  getUserData() {

    this.http.get(`users/${this.userId}`)
    .take(1)
    .subscribe(user => {
      if (user) {
        this.user = user;
        this.socials = user['social'];
        user['social'].map((social, index) => {
          if (String(social.url).includes('facebook.com')) {
            this.socials[index]['icon'] = 'fb.png';
          } else if (String(social.url).includes('olx.ph')) {
            this.socials[index]['icon'] = 'olx.png';
          } else if (String(social.url).includes('shopee.ph')) {
            this.socials[index]['icon'] = 'shopee.png';
          } else if (String(social.url).includes('amazon.com')) {
            this.socials[index]['icon'] = 'amazon.jpg';
          } else if (String(social.url).includes('ebay.ph')) {
            this.socials[index]['icon'] = 'ebay.png';
          } else {
            this.socials[index]['icon'] = 'world.png';
          }
          this.socials[index]['name'] = social.name;
          this.socials[index]['url'] = social.url;
        });

      }
    });

  }

  identity() {
    this.identityModal = true;
  }

  closeIdentity() {
    this.identityModal = false;
  }

  findSocial(name) {
    const social = this.user['social'];
    return social.find((s) => {
      return s['name'] === name;
    });
  }

  isClosed() {
    this.modal = false;
  }

}
