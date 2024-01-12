import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { IMicroArticleComponent } from 'src/app/shared/models/site.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NumericDictionary } from 'lodash';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-micro-article-editor',
  templateUrl: './micro-article-editor.component.html',
  styleUrl: './micro-article-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class MicroArticleEditorComponent extends BaseEditor<IMicroArticleComponent> implements OnInit, OnDestroy {
  public articleTitle = new FormControl();
  public articlesIdToTitleMap?: NumericDictionary<string>;

  private destroy$ = new Subject<void>();

  constructor(
    private articleService: ArticleService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.articleTitle.setValue({
      key: this.value.articleId,
      value: this.value.articleTitle,
    });
    this.articleTitle.updateValueAndValidity();

    this.articleTitle.valueChanges.pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x) && x !== ''),
      debounceTime(500),
      takeUntil(this.destroy$),
    ).subscribe(title => {
      this.articleService.getArticlesByTitle(title).subscribe(model => {
        this.articlesIdToTitleMap = model.articlesIdToTitleMap;
      });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelect($event: MatAutocompleteSelectedEvent): void {
    const value = Number($event.option.value.key);
    this.value.articleId = value;
  }

  public showTitle(value: any): string {
    return value.value;
  }
}
