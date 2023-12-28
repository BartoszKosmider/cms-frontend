import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private store: Store,
    private authService: AuthService,
  ) { }

  public canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.store.dispatch(new Navigate(['/login']));

      return false;
    }

    return true;
  }
}
