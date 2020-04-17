import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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
    this.auth.signIn(email, password)
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
