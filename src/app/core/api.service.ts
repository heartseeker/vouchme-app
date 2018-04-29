import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(url) {
    return this.http.get(`${environment.api_url}${url}`);
  }

  post(url, payload) {
    return this.http.post(`${environment.api_url}${url}`, payload);
  }

}
