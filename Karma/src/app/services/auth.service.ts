import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { from, Observable, concat } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/interfaces';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://karma-f108e.firebaseio.com';

  constructor(private firebaseAuthentication: FirebaseAuthentication, private http: HttpClient) { }

  signUp(signUpInfo: User): Observable<User> {
    const { email, password } = signUpInfo;
    return from(this.firebaseAuthentication.createUserWithEmailAndPassword(email, password));
  }
  createUser(signUpInfo: User): Observable<void | User> {
    const { username, email } = signUpInfo;
    const userId = uuidv4();
    const body = {
      [userId]: {
        username,
        email,
        completedActions: 0,
        ownActions: []
      }
    };
    const storedValue = from(Storage.set({ key: 'id', value: userId}));
    return concat(storedValue, this.http.put<User>(this.baseUrl + '/users.json', body));
  }
}
