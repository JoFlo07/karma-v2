import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  logInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    const { email, password } = this.logInForm.value;
    this.auth.getUsers()
    .pipe(
      map((users) => {
        let userId: string;
        for (const key in users) {
          if (users[key].email === email) {
            userId = key;
          }
        }
        return userId;
      }),
      switchMap((id) => {
        return this.auth.signIn(email, password, id);
      }),
    )
      .subscribe({
        next: (user) => {
          if (user === null) {
            this.router.navigate(['/tabs/main/dashboard']);
          }
        },
        error: (error) => alert(error)
      });
    this.logInForm.setValue({
      email: '',
      password: ''
    });
  }

}
