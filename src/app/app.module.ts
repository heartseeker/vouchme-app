import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './page/home/home.component';
import { PageModule } from './page/page.module';
import { LoginComponent } from './user/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './user/profile/profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/signup', component: SignUpComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes),
    SharedModule,
    PageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
