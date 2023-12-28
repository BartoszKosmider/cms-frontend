import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root'
})
export class IsAdminLoggedGuardService {
  constructor(
    private store: Store,
    private authService: AuthService,
  ) { }

  public canActivate(): boolean {
    if (!this.authService.isAdmin()) {
      this.store.dispatch(new Navigate(['/']));

      return false;
    }

    return true;
  }
}
