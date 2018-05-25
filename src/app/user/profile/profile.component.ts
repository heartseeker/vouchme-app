import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import {Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap, catchError, merge} from 'rxjs/operators';


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile;
  modal = false;
  channels$;
  form: FormGroup;

  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  protected searchStr: string;
  protected dataService: CompleterData;
  searchData;
  selectedPartner = {
    selected: false,
    item: {}
  };
  transactions$;

  isCopied1: boolean;
  rootUrl = environment.website_url;
  text1: string;

  // search;

  formatter;
  constructor(
    private http: ApiService,
    private completerService: CompleterService,
    private fb: FormBuilder
  ) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.http.get('users/search?q=' + term).pipe(
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
    // Init form
    this.form = this.fb.group({
      channel: ['', []],
      url: ['', []],
      partner: ['', []],
      status: [1, []],
    });

    this.transactions$ = this.http.get('transactions');

    this.formatter  = (x: {name: string}) => {
      return x['username'];
    };

    this.channels$ = this.http.get('channels');

    this.http.get('users/me').take(1).subscribe(user => {
      localStorage.setItem('profile', JSON.stringify(user));
      this.profile = user;
      this.text1 = this.rootUrl + 'user/' + user['alias'];
    });

  }

  selected(e) {
    this.selectedPartner.selected = true;
    this.selectedPartner.item = e.item;
  }


  create() {
    const channel = this.form.controls['channel'].value;
    const url = this.form.controls['url'].value;
    let partner;
    const status = this.form.controls['status'].value;

    if (this.selectedPartner.selected) {
      partner = this.form.controls['partner'].value.username;
    } else {
      partner = this.form.controls['partner'].value;
    }

    this.http.post('transactions', {channel, url, partner, status}).subscribe((transact) => {
      console.log('success add user transaction', transact);
      this.transactions$ = this.http.get('transactions');
      this.selectedPartner.selected = false;
    });

    this.modal = false;
  }

  parseDate(id) {
    const timestamp = id.toString().substring(0, 8);
    return new Date( parseInt( timestamp, 16 ) * 1000 );
  }

  changeStatus(transaction, status) {
    const updatedStatus = status.value;
    this.http.put(`transactions/${transaction._id}`, { status: updatedStatus}).subscribe(ss => {
      console.log('success updating status');
    });
  }

  goTo(page) {
    // this.ro
  }

}
