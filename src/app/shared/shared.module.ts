import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../core/api.service';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';


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
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    ApiService
  ]
})
export class SharedModule { }
