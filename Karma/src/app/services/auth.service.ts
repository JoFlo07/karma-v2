import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuthentication: FirebaseAuthentication) { }

  signUp() {
    this.firebaseAuthentication.createUserWithEmailAndPassword('test@gmail.com', '123456')
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }
}
