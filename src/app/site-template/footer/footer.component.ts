import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IFooter } from 'src/app/shared/models/site.model';
import { Observable } from 'rxjs';
import { SetComponentToEdit } from '../store/site.actions';
import { SiteState } from '../store/site.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Select(SiteState.footer)
  public footer$!: Observable<IFooter>;

  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;


  constructor(
    private store: Store,
  ) { }

  public setComponentToEdit(component: IFooter) {
    if (!this.store.selectSnapshot(SiteState.isEditMode)) {
      return;
    }

    this.store.dispatch(new SetComponentToEdit(component));
  }
}
