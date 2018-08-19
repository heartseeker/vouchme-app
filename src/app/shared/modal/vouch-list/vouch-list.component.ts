import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-vouch-list',
  templateUrl: './vouch-list.component.html',
  styleUrls: ['./vouch-list.component.scss']
})
export class VouchListComponent implements OnInit, OnChanges {

  private _modal: boolean;
  vouch;
  vouchType;
  id;
  vouches$;
  verify;
  userId;
  btnLabel;
  btnType;
  modalTitle;
  undoLbl;
  unvouchText;
  ids = [];

  _user;

  @Input('user') set user(value) {
    this._user = value;
  }

  get user(): boolean {
    return this._user;
  }

  @Input('modal') set modal(value) {
    this._modal = value;
  }

  get modal(): boolean {
    return this._modal;
  }

  private _type: string;

  @Input('msg') msg;
  @Input('type') type;
  @Output('close') close = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private http: ApiService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['alias'];
  }

  ngOnInit() {
    this.vouchType = this.type === 'vouch' ? 'vouches' : 'infames';
    this.modalTitle = `List of ${this.vouchType}`;
    this.route.params.subscribe(params => {
      this.userId = params['alias'];
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
        this.setBtnLabel();
      });

      if ('id1' in this.user['profile']) {
        this.ids.push(this.user['profile'].id1);
      }
      if ('id2' in this.user['profile']) {
        this.ids.push(this.user['profile'].id2);
      }
  }

  setBtnLabel() {
    this.http.post(`${this.vouchType}/verify`, {to: this.userId}).subscribe(response => {
      if (this.type === 'vouch') {
        if (response['status']) {
          this.btnLabel = 'Unvouch';
          this.btnType = 'btn-outline-success';
          this.undoLbl = `Do you want to unvouch ${this.user['profile'].first_name} ${this.user['profile'].last_name}?`;
          this.unvouchText = true;
        } else {
          this.btnLabel = 'Vouch';
          this.btnType = 'btn-success';
          this.unvouchText = false;
        }
        return;
      }

      if (response['status']) {
        this.btnLabel = 'Unflame';
        this.btnType = 'btn-outline-danger';
        this.undoLbl = `Do you want to unfame ${this.user['profile'].first_name} ${this.user['profile'].last_name}?`;
        this.unvouchText = true;
        console.log('WTF?');
      } else {
        this.btnLabel = 'Infame';
        this.btnType = 'btn-danger';
        this.unvouchText = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('type' in changes) {
      this.vouchType = this.type === 'vouch' ? 'vouches' : 'infames';
      this.modalTitle = `List of ${this.vouchType}`;
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
      this.setBtnLabel();
    }
  }

  action() {
    this.http.post(`${this.vouchType}`, { to: this.userId }).subscribe(res => {
      if (res['error']) {
        alert(`You already Vouch/Infame this person`);
        this.close.emit({modal: false});
      }

      if ('status' in res) {
        this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
        this.setBtnLabel();
      }

    }, (err) => {
      this.router.navigate(['user/login']);
    });
  }


  async vouchme(id) {
    await this.router.navigate(['/user/', id]);
    this.close.emit({modal: false});
  }

  hideModal() {
    this.close.emit({modal: false});
  }

  unvouch() {
    if (confirm(`Are you sure you want to un${this.type} ${this.user['profile'].first_name} ${this.user['profile'].last_name}?`)) {
      this.action();
    }
  }

}
