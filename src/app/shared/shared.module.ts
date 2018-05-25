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
    SidebarMenuComponent
  ],
  declarations: [
    HeaderComponent,
    ProfileFormComponent,
    FooterComponent,
    SuccessComponent,
    SidebarMenuComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
