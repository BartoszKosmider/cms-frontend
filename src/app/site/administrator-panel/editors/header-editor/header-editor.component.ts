import { Component } from '@angular/core';
import { IHeader } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-header-editor',
  templateUrl: './header-editor.component.html',
  styleUrls: ['./header-editor.component.scss'],
  inputs: BaseEditor.genericInputs,
})
export class HeaderEditorComponent extends BaseEditor<IHeader> {
}
