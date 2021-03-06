import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { SharedService } from '../../shared/shared.service';


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
    private http: ApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.socials = this.profile.social;
    console.log('this.socials', this.socials);
  }

  findSocial() {

  }

  add() {
    this.router.navigate(['/user/connections/add']);
  }

  edit(social) {
    this.sharedService.social = social;
    this.router.navigate([`/user/connections/${social._id}/edit`]);
  }

  delete(id) {
    if (confirm('Are you sure you want to remove this?')) {
      this.http.delete('users/social/' + id).subscribe((socials) => {
        this.profile.social = socials;
        this.socials = socials;
        localStorage.setItem('profile', JSON.stringify(this.profile));
      });
    }
  }

}
