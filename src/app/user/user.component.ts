import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public tabs = ['Settings'];
  public adminTabs = ['Articles', 'Categories', 'Admin accounts'];
  public selectedTab?: string;

  constructor(
    private authService: AuthService,
  ) {
    if (this.authService.isAdmin()) {
      this.tabs.push(...this.adminTabs);
    }
  }
}
