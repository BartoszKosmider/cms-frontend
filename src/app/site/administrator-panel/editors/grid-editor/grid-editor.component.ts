import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { getBlockComponent, getImageComponent, getMicroArticleComponent } from 'src/app/shared/models/default-components.model';
import { IGrid } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';
import { Dictionary } from 'lodash';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class GridEditorComponent extends BaseEditor<IGrid> {
  public availableComponents = [getBlockComponent(), getImageComponent(), getMicroArticleComponent()];

  public iconsDictionary: Dictionary<string> = {
    'Block': 'bi bi-fonts',
    'Image': 'bi bi-image-fill',
    'MicroArticle': 'bi bi-receipt'
  };

  constructor(
    private store: Store,
  ) {
    super();
  }

  public addBlockComponent(): void {
    this.value.components.push(getBlockComponent());
  }
}
