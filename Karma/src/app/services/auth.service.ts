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
    return from(this.firebaseAuthentication.createUserWithEmailAndPassword(email, password));
  }

  createUser(signUpInfo: User): Observable<User | void> {
    const { username, email } = signUpInfo;
    const userId = uuidv4();
    const body = {
        username,
        email,
        completedActions: 0,
        exp_points: 0,
        level: 1,
    };
    return this.http.put<User>(this.baseUrl + `/users/${userId}.json`, body)
      .pipe(
        () => from(Storage.set({ key: 'authenticated', value: 'true' })),
      );
  }

  signIn(email: string, password: string, id: string): Observable<void | object> {
    return from(this.firebaseAuthentication.signInWithEmailAndPassword(email, password))
      .pipe(
        (userObs) => {
          from(Storage.set({ key: 'authenticated', value: 'true' }));
          from(Storage.set({ key: 'user', value: id }));
          return userObs;
        },
      );
  }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + `/users.json`);
  }

  signOut(): Observable<void> {
    return from(Storage.clear());
  }

  async isAuthenticated(): Promise<boolean> {
   const storedKey = await Storage.get({ key: 'authenticated'});
   return storedKey.value ? true : false;
  }

}

