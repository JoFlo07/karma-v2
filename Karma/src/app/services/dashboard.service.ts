import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from '../types/interfaces';

import { User } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = 'https://karma-f108e.firebaseio.com';

  constructor(private http: HttpClient) { }

  fetchActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.baseUrl + '/actions.json');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/users/${id}.json`);
  }
}
