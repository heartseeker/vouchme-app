import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  private _modal: boolean;

  @Input('modal') set modal(value) {
    this._modal = value;
  }

  get modal(): boolean {
    return this._modal;
  }
  @Input('title') title;
  @Input('msg') msg;
  @Output('close') close = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('modal ==>', this.modal);
  }

  hideModal() {
    this.close.emit({modal: false});
  }

}
