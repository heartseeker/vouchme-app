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
    this.vouchType = this.type === 'vouch' ? 'vouches' : 'inflames';
    this.modalTitle = `List of ${this.vouchType}`;
    this.route.params.subscribe(params => {
      this.userId = params['alias'];
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
        this.setBtnLabel();
      });
  }

  setBtnLabel() {
    this.http.post(`${this.vouchType}/verify`, {to: this.userId}).subscribe(response => {
      if (this.type === 'vouch') {
        if (response['status']) {
          this.btnLabel = 'Unvouch';
          this.btnType = 'btn-outline-success';
        } else {
          this.btnLabel = 'Vouch';
          this.btnType = 'btn-success';
        }
        return;
      }

      if (response['status']) {
        this.btnLabel = 'Unflame';
        this.btnType = 'btn-outline-danger';
      } else {
        this.btnLabel = 'Inflame';
        this.btnType = 'btn-danger';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('type' in changes) {
      this.vouchType = this.type === 'vouch' ? 'vouches' : 'inflames';
      this.modalTitle = `List of ${this.vouchType}`;
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
      this.setBtnLabel();
    }
  }

  action() {
    this.http.post(`${this.vouchType}`, { to: this.userId }).subscribe(res => {
      if (res['error']) {
        alert(`You already Vouch/Inflame this person`);
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

}
