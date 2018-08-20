import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  createAuthorizationHeader() {
    let headers = new HttpHeaders();

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    headers = headers
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('x-auth', token);
      return headers;
  }


  get<T>(url): Observable<T> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<T>(`${environment.api_url}${url}`, { headers });
  }

  post<T>(url, payload): Observable<T> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<T>(`${environment.api_url}${url}`, payload, {headers});
  }

  put<T>(url, payload): Observable<T> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<T>(`${environment.api_url}${url}`, payload, {headers});
  }

  delete<T>(url): Observable<T> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<T>(`${environment.api_url}${url}`, {headers});
  }

  upload(url, payload) {
    let headers = new HttpHeaders();

    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    headers = headers
      .set('x-auth', token);

    return this.http.post(`${environment.api_url}${url}`, payload, {headers});
  }


}
