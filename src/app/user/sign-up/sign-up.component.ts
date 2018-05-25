import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../core/api.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { REGIONS } from '../../../constants/philippines';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  regions = REGIONS;
  months = [];
  years = [];
  enableDays = false;
  days = [];

  constructor(
    private fb: FormBuilder,
    private http: ApiService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      first_name: ['', []],
      last_name: ['', []],
      middle_name: ['', []],
      email: ['', []],
      address: ['', []],
      address2: ['', []],
      region: ['', []],
      zip: ['', []],
      gender: ['', []],
      dob_month: ['', []],
      dob_day: ['', []],
      dob_year: ['', []],
    });

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

  }

  enableDaysDropDown(month, year) {
    if (month && year) {
      this.form.controls['dob_day'].enable();
      const days = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth();
      this.days = _.range(1, days);
    }
  }

  signup() {
    const first_name = this.value('first_name');
    const last_name = this.value('last_name');
    const middle_name = this.value('middle_name');
    const email = this.value('email');
    const address = this.value('address');
    const address2 = this.value('address2');
    const region = this.value('region');
    const zip = this.value('zip');
    const gender = this.value('gender');
    const year = this.value('dob_year');
    const day = this.value('dob_day');
    const month = this.value('dob_month');
    const date = `${year}-${month}-${day}`;

    console.log('form', date);
  }

  value(field: string) {
    return this.form.get(field).value;
  }

}
