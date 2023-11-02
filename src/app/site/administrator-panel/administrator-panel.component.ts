import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ComponentType, IBaseComponent } from 'src/app/shared/models/site.model';
import * as _ from 'lodash';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { SiteState } from 'src/app/site-template/store/site.state';
import { AddNewRow, SetComponentToEdit, ToggleEditMode } from '../../site-template/store/site.actions';

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

  constructor(
    private store: Store,
  ) {
  }

  public addNewPage(): void {
    // dodaje nowa stone do menu
  }

  public addNewRow(): void {
    const pageId = this.store.selectSnapshot(SiteState.pageId);
    this.store.dispatch(new AddNewRow(pageId));
  }

  public toggleEditMode(): void {
    this.store.dispatch(new ToggleEditMode());
  }

  public clear(): void {
    this.store.dispatch(new SetComponentToEdit());
  }
}
