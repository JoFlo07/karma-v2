import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../types/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage {
  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  user$: User;
  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (user) => {
          if (user) {
            const parsedUser = Object.values(user)[0];
            this.user$ = parsedUser;
            this.router.navigate(['/tabs']);
          }
        },
        error: (error) => alert(error)
      });
  }
}
