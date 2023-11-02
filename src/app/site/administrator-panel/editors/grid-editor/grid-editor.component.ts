import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { getNewGuid } from 'src/app/shared/models/app.model';
import { getBlockComponent } from 'src/app/shared/models/default-components.model';
import { IGrid } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class GridEditorComponent extends BaseEditor<IGrid> {


  constructor(
    private store: Store,
  ) {
    super();
  }

  public addBlockComponent(): void {
    this.value.components.push(getBlockComponent());
  }
}
