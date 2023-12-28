import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/user/store/user.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

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
    if (_.isNil(token)) {
      return false;
    }

    return !!token && !this.jwtHelperService.isTokenExpired(token);
  }

}
