import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private auth: AuthService) { }

  onSubmit() {
    this.auth.signUp(this.signUpForm.value)
      .subscribe(
        (user) => console.log(user),
        (error) => prompt(error)
      );
  }
}
