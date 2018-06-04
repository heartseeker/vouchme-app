import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, merge } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticateService } from '../../core/authenticate.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  contactForm: FormGroup;
  modal = false;
  user;
  request = false;

  formatter;
  searching = false;
  searchFailed = false;
  errorModal = false;
  errMsg = 'Invalid Request';
  transactions$;
  emailSent = false;

  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private authService: AuthService,
    private auth: AuthenticateService,
    private router: Router
  ) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.http.get('users/find?q=' + term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false),
      merge(this.hideSearchingWhenUnsubscribed)
    )

  ngOnInit() {
    this.user = this.auth.getFbUser();

    this.authService.authState
      .subscribe(res => {
        console.log('facebook', res);
      });

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(4)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    this.transactions$ = this.http.get('transactions/public');

    this.formatter  = (x: {name: string}) => {
      return x['username'];
    };
  }

  async signInWithFB() {
    this.request = true;
    const facebook = await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.http.post(`users/facebook`, facebook).subscribe(res => {
      this.request = false;
      const helper = new JwtHelperService();
      localStorage.setItem('token', res['token']);
      this.router.navigate(['user/profile']);
    }, (err) => {
      this.request = false;
      alert('Invalid request');
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  signUp() {
    const first_name = this.form.controls['first_name'].value;
    const last_name = this.form.controls['last_name'].value;
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;

    const payload = {
      first_name,
      last_name,
      username,
      password
    };

    this.request = true;
    this.http.post('users', payload).subscribe(res => {
      this.request = false;
      this.modal = true;
    }, (err) => {
      this.request = false;
      if (err.error.code === 11000) {
        this.errMsg = 'Email address already used.';
      }
      this.errorModal = true;
    });
  }

  hideModal() {
    this.modal = false;
    this.router.navigate(['user/login']);
  }

  close(e) {
    this.errorModal = false;
  }

  selected(e) {
    const alias = e.item.alias;
    this.router.navigate([`/user/${alias}`]);
  }

  submitContact() {
    const data = {
      name: this.contactForm.get('name').value,
      email: this.contactForm.get('email').value,
      subject: this.contactForm.get('subject').value,
      message: this.contactForm.get('name').value
    };

    this.request = true;
    this.http.post('users/contact', data).subscribe(res => {
      this.emailSent = true;
      this.request = false;
    });
  }

}
