import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetSite } from './site-template/store/site.actions';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public get isLogged(): boolean {
    return this.authService.isAdmin();
  };

  constructor(
    private store: Store,
    private authService: AuthService,
  ) {
    this.store.dispatch(new GetSite());
  }
}
