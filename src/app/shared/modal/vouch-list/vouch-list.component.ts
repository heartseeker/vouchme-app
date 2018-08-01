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
  userId;

  @Input('modal') set modal(value) {
    this._modal = value;
  }

  get modal(): boolean {
    return this._modal;
  }

  private _type: string;

  @Input('title') title;
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
    this.route.params.subscribe(params => {
      console.log('ttype', this.type);
      this.userId = params['alias'];
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change', changes);
    if ('type' in changes) {
      this.vouchType = this.type === 'vouch' ? 'vouches' : 'inflames';
      this.vouches$ =  this.http.get(`${this.vouchType}/list?to=${this.userId}`);
      console.log('changes.type.currentValue', changes.type.currentValue);
    }
  }


  async vouchme(id) {
    await this.router.navigate(['/user/', id]);
    this.close.emit({modal: false});
  }

  hideModal() {
    this.close.emit({modal: false});
  }

}
