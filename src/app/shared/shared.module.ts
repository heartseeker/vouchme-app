import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../core/api.service';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { ProfileFormComponent } from './component/profile-form/profile-form.component';
import { FooterComponent } from './component/footer/footer.component';
import { SuccessComponent } from './modal/success/success.component';
import { SidebarMenuComponent } from './component/sidebar-menu/sidebar-menu.component';
import { LoaderComponent } from './component/loader/loader.component';
import { ErrorComponent } from './modal/error/error.component';
import { SharedService } from './shared.service';
import { UserService } from './service/user.service';
import { SocialService } from './service/social.service';
import { VouchListComponent } from './modal/vouch-list/vouch-list.component';
import { ContainerComponent } from './modal/container/container.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent,
    RouterModule,
    ProfileFormComponent,
    FooterComponent,
    SuccessComponent,
    SidebarMenuComponent,
    LoaderComponent,
    ErrorComponent,
    VouchListComponent,
    ContainerComponent
  ],
  declarations: [
    HeaderComponent,
    ProfileFormComponent,
    FooterComponent,
    SuccessComponent,
    SidebarMenuComponent,
    LoaderComponent,
    ErrorComponent,
    VouchListComponent,
    ContainerComponent
  ],
  providers: [
    ApiService,
    SharedService,
    SocialService,
    UserService
  ]
})
export class SharedModule { }
