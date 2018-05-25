import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, merge } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticateService } from '../../core/authenticate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  modal = false;
  user;

  formatter;
  searching = false;
  searchFailed = false;
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

    console.log('user', this.user);
    console.log('isLoggedin', this.auth.isLoggedIn());

    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.http.post('profiles/user', {}).subscribe(test => {
    //   console.log('test', test);
    // });
    this.formatter  = (x: {name: string}) => {
      return x['username'];
    };
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
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

    console.log('payload', payload);

    this.http.post('users', payload).subscribe(res => {
      this.modal = true;
    });
  }

  hideModal() {
    this.modal = false;
  }

  selected(e) {
    console.log('item', e.item);
    const alias = e.item.alias;
    this.router.navigate([`/user/${alias}`]);
  }

}
