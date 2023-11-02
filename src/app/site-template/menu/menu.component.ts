import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SiteState } from '../store/site.state';
import { Observable } from 'rxjs';
import { IMenuItem } from 'src/app/shared/models/site.model';
import { SetPageId } from '../store/site.actions';
import { trackByIndex } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public trackByIndex = trackByIndex;

  @Select(SiteState.menuItems)
  public menuItems$!: Observable<IMenuItem[]>;

  public constructor(
    private store: Store,
  ) { }

  public setPageId(pageId: string | undefined): void {
    this.store.dispatch(new SetPageId(pageId))
  }
}
