import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-social-connect',
  templateUrl: './social-connect.component.html',
  styleUrls: ['./social-connect.component.scss']
})
export class SocialConnectComponent implements OnInit {

  socials: any = {};
  profile;
  modal = false;

  constructor(
    private router: Router,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.socials = this.profile.social;
    console.log('this.socials', this.socials);
  }

  findSocial() {

  }

  edit() {
    this.router.navigate(['/user/connections/add']);
  }

  delete(id) {

  }

}
