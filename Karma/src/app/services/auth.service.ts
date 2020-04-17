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
  authentiacted: string;
  baseUrl = 'https://karma-f108e.firebaseio.com';

  constructor(private firebaseAuthentication: FirebaseAuthentication, private http: HttpClient) { }

  signUp(signUpInfo: User): Observable<User> {
    const { email, password } = signUpInfo;
    return concat(from(this.firebaseAuthentication.createUserWithEmailAndPassword(email, password)), this.createUser(signUpInfo));
  }
  createUser(signUpInfo: User): Observable<User | void> {
    const { username, email } = signUpInfo;
    const userId = uuidv4();
    const body = {
        username,
        email,
        completedActions: 0
    };
    const storedValue = from(Storage.set({ key: 'authenticated', value: 'true'}));
    return concat(storedValue, this.http.put<User>(this.baseUrl + `/users/${userId}.json`, body));
  }

  signIn(email: string, password: string): Observable<void | object> {
    const storedValue = from(Storage.set({ key: 'authenticated', value: 'true' }));
    return concat(storedValue, from(this.firebaseAuthentication.signInWithEmailAndPassword(email, password)));
  }

  signOut(): Observable<void> {
    return from(Storage.clear());
  }

  async isAuthenticated(): Promise<boolean> {
   const storedKey = await Storage.get({ key: 'authenticated'});
   console.log(storedKey.value, 'STORED KEY')
   return storedKey.value ? true : false;
  }

}

