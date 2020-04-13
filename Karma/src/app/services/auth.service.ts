import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { from, Observable } from 'rxjs';

import { User } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://karma-f108e.firebaseio.com';

  constructor(private firebaseAuthentication: FirebaseAuthentication, private http: HttpClient) { }

  signUp(signUpInfo: User): Observable<User> {
    const { email, password } = signUpInfo;
    this.createUser(signUpInfo).subscribe((user) => console.log('UUUUUSER', user));
    return from(this.firebaseAuthentication.createUserWithEmailAndPassword(email, password));
  }

  createUser(signUpInfo: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/user.json', signUpInfo);
  }
}
