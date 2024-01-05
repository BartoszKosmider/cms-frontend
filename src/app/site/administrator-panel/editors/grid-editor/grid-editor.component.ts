import { Component } from '@angular/core';
import { getBlockComponent, getImageComponent, getMicroArticleComponent, getTwitterComponent } from 'src/app/shared/models/default-components.model';
import { IGrid } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';
import { Dictionary } from 'lodash';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ImagePathDictionary } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class GridEditorComponent extends BaseEditor<IGrid> {
  public availableComponents = [
    getBlockComponent(),
    getImageComponent(),
    getMicroArticleComponent(),
    getTwitterComponent(),
  ];

  public iconsDictionary: Dictionary<string> = {
    'Block': 'bi bi-fonts',
    'Image': 'bi bi-image-fill',
    'MicroArticle': 'bi bi-receipt',
    'Twitter': 'bi bi-twitter',
  };

  public imagePathDictionary = ImagePathDictionary;

  public canDrop(drag: CdkDrag<any>, drop: CdkDropList<any>): boolean {
    return false;
  }
}
