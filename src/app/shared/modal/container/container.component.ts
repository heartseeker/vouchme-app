import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  @Output('close') close = new EventEmitter();

  private _modal: boolean;

  @Input('modal') set modal(value) {
    this._modal = value;
  }

  get modal(): boolean {
    return this._modal;
  }
  @Input('title') title;

  constructor() { }

  ngOnInit() {
  }

  hideModal() {
    this.close.emit({ show: false });
  }

}
