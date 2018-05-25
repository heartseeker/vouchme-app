import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channels$;

  constructor(
    private http: ApiService
  ) { }

  ngOnInit() {
    this.channels$ = this.http.get('channels');
  }

  delete(id) {
    if (confirm('Are you sure you want to delete this channel?')) {
      this.http.delete(`channels/${id}`)
      .subscribe(res => {
        this.channels$ = this.http.get('channels');
        alert('Success deleting the channel');
      });
    }
  }

}
