import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RegisterUser } from '../user/store/user.action';
import { IRegisterUserDto } from '../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    username: new FormControl<string>('Admin', [Validators.required]),
    password: new FormControl<string>('Password#=123', [Validators.required]),
    name: new FormControl<string>('dupa1', [Validators.required]),
    email: new FormControl<string>('dupa2@chuj.pl', [Validators.required, Validators.email]),
  });

  constructor(
    private store: Store,
  ) {

  }

  public register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const registerFormValues = this.registerForm.getRawValue();
    this.store.dispatch(new RegisterUser(<IRegisterUserDto>{
      username: registerFormValues.username,
      password: registerFormValues.password,
      name: registerFormValues.name,
      email: registerFormValues.email,
    }));
  }
}
