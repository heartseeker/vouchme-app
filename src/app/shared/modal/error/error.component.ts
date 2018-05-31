import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

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
