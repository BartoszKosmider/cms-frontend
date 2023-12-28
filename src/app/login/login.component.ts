import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _ from 'lodash';
import { LoginUser } from '../user/store/user.action';
import { ILoginDto } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl<string>('Admin', [Validators.required]),
    password: new FormControl<string>('Password#=123', [Validators.required]),
  });

  constructor(
    private store: Store,
  ) {
  }

  public login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const formValues = this.loginForm.getRawValue();
    this.store.dispatch(new LoginUser(<ILoginDto>{
      username: formValues.username,
      password: formValues.password,
    }))
  }
}
