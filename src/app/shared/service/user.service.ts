import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: ApiService
  ) { }

}
