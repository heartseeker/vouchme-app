import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HomeComponent } from './page/home/home.component';
import { PageModule } from './page/page.module';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/signup', component: SignUpComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes),
    PageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
