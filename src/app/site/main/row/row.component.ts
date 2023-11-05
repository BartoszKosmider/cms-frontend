import { Component, Input } from '@angular/core';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { IGrid, IRow } from 'src/app/shared/models/site.model';
import { Select, Store } from '@ngxs/store';
import { SetComponentToEdit } from 'src/app/site-template/store/site.actions';
import { Observable, tap } from 'rxjs';
import { SiteState } from 'src/app/site-template/store/site.state';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  public trackByIndex = trackByIndex;

  @Input()
  public row!: IRow;

  public constructor(
    private store: Store,
  ) {
  }

  public setRowToEdit(): () => void {
    return () => this.store.dispatch(new SetComponentToEdit(this.row));
  }

  public setGridToEdit(grid: IGrid): () => void {
    return () => this.store.dispatch(new SetComponentToEdit(grid));
  }

  public deleteGrid(grid: IGrid): () => void {
    return () => {
      if (this.row.gridItems.length === 1) {
        return;
      }
      this.row.gridItems = this.row.gridItems.filter(r => r.id !== grid.id)
    };
  }
}
