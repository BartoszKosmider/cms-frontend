import { Component } from '@angular/core';
import { IBlockComponent } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-block-editor',
  templateUrl: './block-editor.component.html',
  styleUrls: ['./block-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class BlockEditorComponent extends BaseEditor<IBlockComponent>  {
}
