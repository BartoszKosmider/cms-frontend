import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import * as _ from 'lodash';
import { distinctUntilChanged, filter } from 'rxjs';
import { IRow } from 'src/app/shared/models/site.model';
import { UpdateRowColumns } from 'src/app/site-template/store/site.actions';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-row-editor',
  templateUrl: './row-editor.component.html',
  styleUrls: ['./row-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class RowEditorComponent extends BaseEditor<IRow> implements OnInit {
  public numberOfColumns = new FormControl<number>(1);

  constructor(
    private store: Store,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.numberOfColumns.setValue(this.value.gridItems.length);

    this.numberOfColumns.valueChanges.pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x) && x > 0 && x < 13),
    ).subscribe(numberOfColumns => {
      if (numberOfColumns) {
        this.store.dispatch(new UpdateRowColumns(this.value.id, numberOfColumns));
      }
    });
  }

}
