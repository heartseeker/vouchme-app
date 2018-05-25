import { SocialConnectComponent } from './user/social-connect/social-connect.component';
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
import { AuthGuardService } from './shared/service/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { Ng2CompleterModule } from 'ng2-completer';
import { ClipboardModule } from 'ngx-clipboard';
import { EditComponent } from './user/edit/edit.component';
import { PublicComponent } from './user/public/public.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialEditComponent } from './user/social-connect/edit/social-edit.component';
import { ChannelComponent } from './user/channel/channel.component';
import { ChannelAddComponent } from './user/channel/channel-add/channel-add.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/signup', component: SignUpComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'user/edit', component: EditComponent, canActivate: [AuthGuardService] },
  { path: 'user/connections/add', component: SocialEditComponent },
  { path: 'user/connections', component: SocialConnectComponent },
  { path: 'user/channels/add', component: ChannelAddComponent },
  { path: 'user/channels', component: ChannelComponent },
  { path: 'user/:alias', component: PublicComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ProfileComponent,
    EditComponent,
    PublicComponent,
    SocialConnectComponent,
    SocialEditComponent,
    ChannelComponent,
    ChannelAddComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    SharedModule,
    PageModule,
    Ng2CompleterModule,
    ClipboardModule
  ],
  providers: [
    AuthGuardService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AddHeaderInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
