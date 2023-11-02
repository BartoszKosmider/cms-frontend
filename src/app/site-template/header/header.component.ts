import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IBaseComponent, IHeader } from 'src/app/shared/models/site.model';
import { SetComponentToEdit } from '../store/site.actions';
import { SiteState } from '../store/site.state';
import { Observable } from 'rxjs';

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
  ) {
  }

  public setComponentToEdit(component: IBaseComponent) {
    this.store.dispatch(new SetComponentToEdit(component));
  }
}
