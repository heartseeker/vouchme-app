import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(
    private route: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async logout() {
    localStorage.clear();
    this.authService.authState
      .subscribe(async (res) => {
        if (res) {
          await this.authService.signOut();
        }
      });

    this.route.navigate(['/']);
  }

}
