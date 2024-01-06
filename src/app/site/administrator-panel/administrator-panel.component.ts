import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ComponentType, IBaseComponent } from 'src/app/shared/models/site.model';
import * as _ from 'lodash';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { SiteState } from 'src/app/site-template/store/site.state';
import { AddNewPage, AddNewRow, DiscardSiteChanges, SaveSite, SetComponentToEdit, ToggleEditMode } from '../../site-template/store/site.actions';
import { stringify } from 'flatted';

@Component({
  selector: 'app-administrator-panel',
  templateUrl: './administrator-panel.component.html',
  styleUrls: ['./administrator-panel.component.scss']
})
export class AdministratorPanelComponent {
  public trackByIndex = trackByIndex;
  public componentType = ComponentType;

  @Select(SiteState.componentToEdit)
  public componentToEdit$!: Observable<IBaseComponent | undefined>;

  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;

  constructor(
    private store: Store,
  ) {
  }

  public addNewPage(): void {
    this.store.dispatch(new AddNewPage());
  }

  public addNewRow(): void {
    const pageId = this.store.selectSnapshot(SiteState.pageId);
    this.store.dispatch(new AddNewRow(pageId));
  }

  public toggleEditMode(): void {
    this.store.dispatch(new ToggleEditMode());
  }

  public saveSite(): void {
    const site = this.store.selectSnapshot(SiteState.site);
    this.store.dispatch(new SaveSite({
      site: site,
    }));
  }

  public return(): void {
    this.store.dispatch(new SetComponentToEdit());
  }

  public cancelEdit(): void {
    this.store.dispatch([new ToggleEditMode(), new DiscardSiteChanges()]);
  }
}
