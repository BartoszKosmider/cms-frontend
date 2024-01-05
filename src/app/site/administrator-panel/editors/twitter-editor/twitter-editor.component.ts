import { Component } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { ITwitterComponent } from 'src/app/shared/models/site.model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { TwitterService } from 'src/app/shared/services/twitter.service';

@Component({
  selector: 'app-twitter-editor',
  templateUrl: './twitter-editor.component.html',
  styleUrl: './twitter-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class TwitterEditorComponent extends BaseEditor<ITwitterComponent> {
  public postUrl = new FormControl<string>('');

  constructor(
    private twitterService: TwitterService,
  ) {
    super();
  }

  public load(): void {
    if (!_.isNil(this.postUrl.value)) {
      this.twitterService.getPost(this.postUrl.value).subscribe(res => {
        this.value.twitterPostHtml = res.html;
        (<any>window).twttr.widgets.load();
      })
    }
  }
}
