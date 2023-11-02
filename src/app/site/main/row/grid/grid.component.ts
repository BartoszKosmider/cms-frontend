import { Component, Input } from '@angular/core';
import { GridComponentType, IBaseComponent, IGrid } from 'src/app/shared/models/site.model';
import { ComponentType } from '../../../../shared/models/site.model';
import { Store } from '@ngxs/store';
import { getNewGuid, trackByIndex } from 'src/app/shared/models/app.model';
import { SetComponentToEdit } from 'src/app/site-template/store/site.actions';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

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

  public setComponentToEdit(component: IBaseComponent): () => void {
    return () => this.store.dispatch(new SetComponentToEdit(component));
  }

  public deleteComponent(component: IBaseComponent): () => void {
    return () => {
      this.grid.components = this.grid.components.filter(c => c.id !== component.id);
    };
  }

  public drop(event: CdkDragDrop<GridComponentType[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      item.id = getNewGuid();
      copyArrayItem(
        _.cloneDeep(event.previousContainer.data),
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
