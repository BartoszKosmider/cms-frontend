import { Component } from '@angular/core';
import { IBlockComponent } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';
import { FontFamily, TextAlign, VerticalAlign } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class BlockEditorComponent extends BaseEditor<IBlockComponent> {
  public fontFamilies = FontFamily;
  public textAligns = TextAlign;
  public verticalAligns = VerticalAlign;
}
