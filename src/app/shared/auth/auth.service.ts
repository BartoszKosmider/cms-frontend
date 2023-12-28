import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/user/store/user.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';
import { IJwtToken, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private jwtHelperService: JwtHelperService,
  ) { }

  public isAuthenticated(): boolean {
    const token = this.store.selectSnapshot(UserState.token);
    if (_.isNil(token) || token.trim() === '') {
      return false;
    }

    return !!token && !this.jwtHelperService.isTokenExpired(token);
  }

  public isAdmin(): boolean {
    const isValid = this.isAuthenticated();
    if (!isValid) {
      return false;
    }

    const token = this.store.selectSnapshot(UserState.token);
    const decode = this.jwtHelperService.decodeToken<IJwtToken>(<string>token);

    return decode?.role === UserRole.Admin;
  }

  public isUser(): boolean {
    const isValid = this.isAuthenticated();
    if (!isValid) {
      return false;
    }

    const token = this.store.selectSnapshot(UserState.token);
    const decode = this.jwtHelperService.decodeToken<IJwtToken>(<string>token);

    return decode?.role === UserRole.User;
  }
}
