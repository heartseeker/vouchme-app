import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';


@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(
    private http: ApiService
  ) { }

  getSocial(id: string) {
    return this.http.get(`users/social/${id}`);
  }
}
