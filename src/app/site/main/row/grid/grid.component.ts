import { Component, Input } from '@angular/core';
import { IBaseComponent, IGrid } from 'src/app/shared/models/site.model';
import { ComponentType } from '../../../../shared/models/site.model';
import { Store } from '@ngxs/store';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { SetComponentToEdit } from 'src/app/site-template/store/site.actions';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  public baseComponentType = ComponentType;
  public trackByIndex = trackByIndex;

  @Input()
  public grid!: IGrid;

  public constructor(
    private store: Store,
  ) { }

  public setComponentToEdit(component: IBaseComponent) {
    this.store.dispatch(new SetComponentToEdit(component));
  }
}
