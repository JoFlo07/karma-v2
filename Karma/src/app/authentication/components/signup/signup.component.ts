import { Component  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (user) => {
          if (user) {
            this.router.navigate(['/tabs/main/dashboard']);
          }
        },
        error: (error) => alert(error)
      });
    this.signUpForm.setValue({
      username: '',
      email: '',
      password: ''
    });
  }

}
