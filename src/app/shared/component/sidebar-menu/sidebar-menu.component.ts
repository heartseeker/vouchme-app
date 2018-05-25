import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

}
