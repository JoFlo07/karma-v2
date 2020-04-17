import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(): Promise<boolean> {
    const auth = await this.auth.isAuthenticated();
    if (!auth) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
