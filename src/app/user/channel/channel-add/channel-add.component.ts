import { ApiService } from './../../../core/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-channel-add',
  templateUrl: './channel-add.component.html',
  styleUrls: ['./channel-add.component.scss']
})
export class ChannelAddComponent implements OnInit {

  form: FormGroup;
  modal = false;

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  add() {
    const name = this.form.get('name').value;
    this.http.post('channels', { name }).subscribe(res => {
      this.router.navigate(['/user/channels']);
    });
  }

}
