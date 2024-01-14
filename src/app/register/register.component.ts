import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RegisterAdmin, RegisterUser } from '../user/store/user.action';
import { IRegisterUserDto } from '../shared/models/user.model';
import { AuthService } from '../shared/auth/auth.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private isRegisterAdmin = false;

  public registerForm = new FormGroup({
    username: new FormControl<string>('Admin', [Validators.required]),
    password: new FormControl<string>('Password#=123', [Validators.required]),
    name: new FormControl<string>('todo', [Validators.required]),
    email: new FormControl<string>('aaa@bbb.com', [Validators.required, Validators.email]),
  });

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {
    if (this.authService.isUser()) {
      this.store.dispatch(new Navigate(['/user']));
    }

    if (this.authService.isAdmin()) {
      this.isRegisterAdmin = true;
    }
  }

  public register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.isRegisterAdmin) {
      this.registerAdmin();
    } else {
      this.registerUser();
    }
  }

  private registerUser(): void {
    const registerFormValues = this.registerForm.getRawValue();
    this.store.dispatch(new RegisterUser(<IRegisterUserDto>{
      username: registerFormValues.username,
      password: registerFormValues.password,
      name: registerFormValues.name,
      email: registerFormValues.email,
    }));
  }

  private registerAdmin(): void {
    const registerFormValues = this.registerForm.getRawValue();
    this.store.dispatch(new RegisterAdmin(<IRegisterUserDto>{
      username: registerFormValues.username,
      password: registerFormValues.password,
      name: registerFormValues.name,
      email: registerFormValues.email,
    }));
  }
}
