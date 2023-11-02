import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Editor, Toolbar, Validators as EditorValidators } from 'ngx-editor';
import { toHTML } from 'ngx-editor';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  public editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public form = new FormGroup({
    editorContent: new FormControl<Record<string, any>>(
      { value: null, disabled: false },
      EditorValidators.required()
    ),
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });


  public saveArticle(): void {
    console.log('todo', this.form.getRawValue(), this.form.valid);
  }

  public get editorXml(): string {
    const editorContentValue = this.form.get('editorContent')?.value;

    return !_.isNil(editorContentValue) ? toHTML(editorContentValue) : '';
  }
}
