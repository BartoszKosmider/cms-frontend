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
  public isRowSelected = false;

  @Input()
  public row!: IRow;

  public constructor(
    private store: Store,
  ) {

    this.store.select(SiteState.isRowSelected).pipe(tap(value => this.isRowSelected = value))
  }

  public setRowToEdit(): void {
    this.store.dispatch(new SetComponentToEdit(this.row));
  }

  public setGridToEdit(grid: IGrid): void {
    this.store.dispatch(new SetComponentToEdit(grid));
  }
}
