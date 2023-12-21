import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _ from 'lodash';
import { Subject, distinctUntilChanged, filter } from 'rxjs';
import { IRow } from 'src/app/shared/models/site.model';
import { UpdateRowColumns } from 'src/app/site-template/store/site.actions';
import { BaseEditor } from '../base-editor';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { RowHorizontalAlignment, RowVerticalAlignment } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-row-editor',
  templateUrl: './row-editor.component.html',
  styleUrls: ['./row-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class RowEditorComponent extends BaseEditor<IRow> implements OnInit, OnDestroy {
  public numberOfColumns = new FormControl<number>(1);
  public horizontalAlignmentButtons = [
    {
      icon: 'bi bi-align-start',
      className: RowHorizontalAlignment.Start,
    },
    {
      icon: 'bi bi-align-center',
      className: RowHorizontalAlignment.Center,
    },
    {
    icon: 'bi bi-align-end',
    className: RowHorizontalAlignment.End,
    },
  ];

  public verticalAlignmentButtons = [
    {
      icon: 'bi bi-align-top',
      className: RowVerticalAlignment.Top,
    },
    {
      icon: 'bi bi-align-middle',
      className: RowVerticalAlignment.Middle,
    },
    {
    icon: 'bi bi-align-bottom',
    className: RowVerticalAlignment.Bottom,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.numberOfColumns.setValue(this.value.gridItems.length);

    this.numberOfColumns.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(x => !_.isNil(x) && x > 0 && x < 13),
      takeUntil(this.destroy$),
    ).subscribe(numberOfColumns => {
      if (numberOfColumns) {
        this.store.dispatch(new UpdateRowColumns(this.value.id, numberOfColumns));
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getRange(): number[] {
    return _.range(<number>this.value.gridItems.length);
  }

  public setHorizontalAlignment(className: string): void {
    this.value.horizontalAlignment = className;
  }

  public setVerticalAlignment(className: string): void {
    this.value.verticalAlignment = className;
  }
}
