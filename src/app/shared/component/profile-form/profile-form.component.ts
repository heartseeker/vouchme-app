import { environment } from './../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { REGIONS } from '../../../../constants/philippines';
import { ApiService } from '../../../core/api.service';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  form: FormGroup;
  regions = REGIONS;
  months = [];
  years = [];
  enableDays = false;
  days = [];
  user;
  fileSelected: File;
  id1: File;
  id2: File;
  billing: File;
  modal = false;
  id1Url;
  id2Url;
  billingUrl;
  profile;

  @Input('mode') mode;
  @Input('btnLabel') btnLabel = 'Create account';

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
  ) { }

  ngOnInit() {
    if (this.mode === 'edit') {
      this.loadProfileForm();
    } else {
      this.form = this.fb.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        middle_name: ['', []],
        phone: ['', []],
        alias: ['', []],
        email: ['', []],
        address: ['', []],
        region: ['', []],
        zip: ['', []],
        gender: ['', []],
        dob_month: ['', []],
        dob_day: ['', []],
        dob_year: ['', []]
      });
    }


    const p = moment.months().map((m, index) => {
      this.months.push({
        value: index + 1,
        name: m
      });
    });

    this.years = _.range(1920, (new Date()).getFullYear() - 5);

    this.form.controls['dob_day'].disable();

    const month = this.form.controls['dob_month'].value;
    const year = this.form.controls['dob_year'].value;

    // watch months dropdown
    this.form.controls['dob_month'].valueChanges.subscribe(() => {
      this.enableDaysDropDown(this.form.controls['dob_month'].value, this.form.controls['dob_year'].value);
    });

    // watch years dropdown
    this.form.controls['dob_year'].valueChanges.subscribe(() => {
      this.enableDaysDropDown(this.form.controls['dob_month'].value, this.form.controls['dob_year'].value);
    });

    this.profile = JSON.parse(localStorage.getItem('profile'));

    if (this.profile.profile.id1) {
      this.id1Url = `${environment.api_base_url}images/${this.profile._id}/${this.profile.profile.id1}`;
    }
    if (this.profile.profile.id2) {
      this.id2Url = `${environment.api_base_url}images/${this.profile._id}/${this.profile.profile.id2}`;
    }
    if (this.profile.profile.billing) {
      this.billingUrl = `${environment.api_base_url}images/${this.profile._id}/${this.profile.profile.billing}`;
    }
    console.log(`${environment.api_base_url}images/${this.profile._id}/${this.profile.profile.id1}`);
  }

  loadProfileForm() {
    this.user = JSON.parse(localStorage.getItem('profile'));

    this.form = this.fb.group({
      first_name: [this.user.profile.first_name, [Validators.required]],
      last_name: [this.user.profile.last_name, [Validators.required]],
      middle_name: [this.user.profile.middle_name, []],
      phone: [this.user.profile.phone, []],
      alias: [this.user.alias, []],
      email: [this.user.username, []],
      address: [this.user.profile.address, []],
      region: [this.user.profile.region, []],
      zip: [this.user.profile.zip, []],
      gender: [this.user.profile.gender, []],
      dob_month: ['', []],
      dob_day: ['', []],
      dob_year: ['', []]
    });
  }

  enableDaysDropDown(month, year) {
    if (month && year) {
      this.form.controls['dob_day'].enable();
      const days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      this.days = _.range(1, days);
    }
  }

  save() {

    const year = this.value('dob_year');
    const day = this.value('dob_day');
    const month = this.value('dob_month');

    const data = {
      first_name: this.value('first_name'),
      last_name: this.value('last_name'),
      middle_name: this.value('middle_name'),
      phone: this.value('phone'),
      alias: this.value('alias'),
      username: this.value('email'),
      address: this.value('address'),
      region: this.value('region'),
      zip: this.value('zip'),
      gender: this.value('gender'),
      date: `${year}-${month}-${day}`
    };

    if (this.mode === 'edit') {
      this.updateProfile(data);
    } else {
      // create data
      this.createProfile(data);
    }

    console.log('form', this.form);
  }

  createProfile(data) {
    const userPayload = _.pick(data, ['username', 'alias']);

    const profilePayload = _.pick(data, [
      'first_name',
      'last_name',
      'middle_name',
      'phone',
      'address',
      'region',
      'zip',
      'gender',
      'dob',
    ]);

    // update user endpoint
    this.http.post('users', userPayload).subscribe((user) => {
        localStorage.setItem('profile', JSON.stringify(user));
        this.modal = true;
    });

  }

  updateProfile(data) {
    const userPayload = _.pick(data, ['username', 'alias']);

    const profilePayload = _.pick(data, [
      'first_name',
      'last_name',
      'middle_name',
      'phone',
      'address',
      'region',
      'zip',
      'gender',
      'dob',
    ]);

    userPayload['profile'] = profilePayload;

    const fd = new FormData();
    if (this.id1) {
      fd.append('id1', this.id1, this.id1.name);
    }
    if (this.id2) {
      fd.append('id2', this.id2, this.id2.name);
    }
    if (this.billing) {
      fd.append('billing', this.billing, this.billing.name);
    }

    // update user endpoint
    this.http.put('users', userPayload).subscribe((user) => {
      this.http.upload('users/upload', fd).subscribe((res) => {
        localStorage.setItem('profile', JSON.stringify(res));
        this.modal = true;
        this.loadProfile();
      }, (err) => {
        if (err.status === 200) {
          this.modal = true;
          this.loadProfile();
        }
      });
    });
  }

  onFileChange(event, name) {
    switch (name) {
      case 'id1':
        this.id1 = event.target.files[0];
        break;
      case 'id2':
        this.id2 = event.target.files[0];
        break;
      case 'billing':
        this.billing = event.target.files[0];
        break;
    }
  }

  close(event) {
    console.log('e', event);
    this.modal = false;
  }

  value(field: string) {
    return this.form.get(field).value;
  }

  onSelectFile(event, name) {
    /* tslint:disable */
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e) => { // called once readAsDataURL is completed
        this[name] = e.target['result'];
      };
    }
    /* tslint:enable */
  }

  loadProfile() {
    this.http.get('users/me').subscribe((user) => {
      localStorage.removeItem('profile');
      localStorage.setItem('profile', JSON.stringify(user));
    });
  }

}
