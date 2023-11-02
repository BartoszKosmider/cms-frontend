import { Component } from '@angular/core';
import { IFooter } from 'src/app/shared/models/site.model';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-footer-editor',
  templateUrl: './footer-editor.component.html',
  styleUrls: ['./footer-editor.component.scss'],
  inputs:  BaseEditor.genericInputs,
})
export class FooterEditorComponent extends BaseEditor<IFooter> {

}
