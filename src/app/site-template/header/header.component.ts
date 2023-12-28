import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IBaseComponent, IHeader } from 'src/app/shared/models/site.model';
import { SetComponentToEdit } from '../store/site.actions';
import { SiteState } from '../store/site.state';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/user/store/user.action';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Select(SiteState.header)
  public header$!: Observable<IHeader>;

  constructor(
    private store: Store,
    public authService: AuthService,
  ) {
  }

  public setComponentToEdit(component: IBaseComponent) {
    this.store.dispatch(new SetComponentToEdit(component));
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
