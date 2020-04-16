import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  signOut() {
    this.auth.signOut()
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (e) => console.log(e),
      });
  }
}
