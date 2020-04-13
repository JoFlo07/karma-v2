import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Action } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = 'https://karma-f108e.firebaseio.com';

  constructor(private http: HttpClient) { }

  fetchActions(): Observable<Action[]> {
    return this.http.get<Action[]>(this.baseUrl + '/actions/-M4T0IKGM1P6YKgdUfP6.json');
  }
}
