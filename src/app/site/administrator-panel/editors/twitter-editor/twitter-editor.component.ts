import { Component, OnDestroy } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { ITwitterComponent } from 'src/app/shared/models/site.model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { TwitterService } from 'src/app/shared/services/twitter.service';
import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-twitter-editor',
  templateUrl: './twitter-editor.component.html',
  styleUrl: './twitter-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class TwitterEditorComponent extends BaseEditor<ITwitterComponent> implements OnDestroy {
  public postUrl = new FormControl<string>('');

  private destroy$ = new Subject<void>();

  constructor(
    private twitterService: TwitterService,
  ) {
    super();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public load(): void {
    if (!_.isNil(this.postUrl.value)) {
      this.twitterService.getPost(this.postUrl.value).pipe(
        takeUntil(this.destroy$),
        map(response => response.html.replace('<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>', ''))
      ).subscribe(html => {
        console.log('html', html);
        this.value.twitterPostHtml = html;
        (<any>window).twttr.widgets.load();
      })
    }
  }
}
