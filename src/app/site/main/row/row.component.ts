import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { trackByIndex } from 'src/app/shared/models/app.model';
import { IGrid, IRow } from 'src/app/shared/models/site.model';
import { Store } from '@ngxs/store';
import { SetComponentToEdit } from 'src/app/site-template/store/site.actions';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  public trackByIndex = trackByIndex;
  public selectedGrid?: string;
  public selectedRow?: string;

  @HostListener('document:mousedown', ['$event'])
  public onGlobalClick(event: { target: any; }): void {
     if (!this.elementRef.nativeElement.contains(event.target)) {
      this.selectedGrid = undefined;
      this.selectedRow = undefined;
     }
  }

  @Input()
  public row!: IRow;

  public constructor(
    private store: Store,
    private elementRef: ElementRef,
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
